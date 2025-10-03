import { useState, useRef, useEffect, useCallback } from "react";

export function useMicrophone() {
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isListeningRef = useRef<boolean>(false);

  useEffect(() => {
    // Check if getUserMedia is supported
    setIsSupported(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
  }, []);

  const startListening = useCallback(async () => {
    if (!isSupported || isListening) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      
      // Create AudioContext
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioContext = audioContextRef.current;
      
      // Create analyser
      analyserRef.current = audioContext.createAnalyser();
      const analyser = analyserRef.current;
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      
      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      isListeningRef.current = true;
      setIsListening(true);
      
      // Start analyzing audio
      const analyzeAudio = () => {
        if (!analyser || !isListeningRef.current) return;
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate average volume
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        const normalizedLevel = Math.min(average / 255, 1);
        
        setAudioLevel(normalizedLevel);
        
        if (isListeningRef.current) {
          animationFrameRef.current = requestAnimationFrame(analyzeAudio);
        }
      };
      
      analyzeAudio();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsListening(false);
      setHasFailed(true);
      setIsSupported(false);
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (!isListeningRef.current) return;
    
    isListeningRef.current = false;
    
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Stop media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setIsListening(false);
    setAudioLevel(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    audioLevel,
    isSupported,
    hasFailed,
    startListening,
    stopListening
  };
}
