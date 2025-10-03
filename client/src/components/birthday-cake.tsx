import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMicrophone } from "@/hooks/use-microphone";

interface Candle {
  id: number;
  lit: boolean;
  color: string;
}

export default function BirthdayCake() {
  const [candles, setCandles] = useState<Candle[]>([
    { id: 1, lit: true, color: "from-red-400 to-red-600 border-red-700" },
    { id: 2, lit: true, color: "from-blue-400 to-blue-600 border-blue-700" },
    { id: 3, lit: true, color: "from-green-400 to-green-600 border-green-700" },
    { id: 4, lit: true, color: "from-yellow-400 to-yellow-600 border-yellow-700" },
    { id: 5, lit: true, color: "from-purple-400 to-purple-600 border-purple-700" },
  ]);
  
  const [allBlownOut, setAllBlownOut] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string; rotation: number }[]>([]);
  const { isListening, audioLevel, startListening, stopListening, isSupported } = useMicrophone();

  useEffect(() => {
    if (audioLevel > 0.3 && isListening) {
      blowOutCandles();
    }
  }, [audioLevel, isListening]);

  const blowOutCandles = () => {
    if (allBlownOut) return;

    const litCandles = candles.filter(c => c.lit);
    if (litCandles.length === 0) return;

    const candleToBlowOut = litCandles[0];
    
    setCandles(prev => prev.map(candle => 
      candle.id === candleToBlowOut.id 
        ? { ...candle, lit: false }
        : candle
    ));

    const remainingLit = litCandles.length - 1;
    if (remainingLit === 0) {
      setTimeout(() => {
        setAllBlownOut(true);
        createConfetti();
        setTimeout(() => setShowWish(true), 1000);
      }, 500);
    }
  };

  const createConfetti = () => {
    const colors = ['#FFB6C1', '#FF69B4', '#DDA0DD', '#FFD700', '#FFC966', '#E6E6FA'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));
    
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleManualBlow = () => {
    if (isSupported) {
      if (!isListening) {
        startListening();
      } else {
        stopListening();
      }
    } else {
      blowOutCandles();
    }
  };

  return (
    <div className="relative inline-block" data-testid="birthday-cake">
      {/* Confetti Animation */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="fixed w-3 h-3 pointer-events-none z-50"
            style={{
              backgroundColor: piece.color,
              left: `${piece.x}%`,
              top: '10%',
            }}
            initial={{ y: 0, rotate: piece.rotation, opacity: 1 }}
            animate={{ 
              y: window.innerHeight,
              rotate: piece.rotation + 720,
              opacity: 0,
            }}
            transition={{ duration: 3, ease: "linear" }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      <div className="relative">
        {/* Cake Base */}
        <div className="relative">
          {/* Top Tier */}
          <motion.div 
            className="relative mx-auto w-48 h-32 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-full border-4 border-pink-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-transparent rounded-t-full"></div>
            {/* Frosting Decorations */}
            <motion.div 
              className="absolute -top-2 left-1/4 w-8 h-8 bg-white rounded-full border-2 border-pink-300"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <motion.div 
              className="absolute -top-2 right-1/4 w-8 h-8 bg-white rounded-full border-2 border-pink-300"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.div>
          
          {/* Middle Tier */}
          <motion.div 
            className="relative mx-auto w-64 h-40 bg-gradient-to-b from-purple-200 to-purple-300 border-4 border-purple-400 -mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-transparent"></div>
            {/* Decorative Hearts */}
            <motion.div
              className="absolute top-4 left-8"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            <motion.div
              className="absolute top-4 right-8"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              ⭐
            </motion.div>
          </motion.div>
          
          {/* Bottom Tier */}
          <motion.div 
            className="relative mx-auto w-80 h-48 bg-gradient-to-b from-pink-300 to-pink-400 rounded-b-3xl border-4 border-pink-500 -mt-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 to-transparent rounded-b-3xl"></div>
            {/* Bottom Decorations */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/30 rounded-b-3xl border-t-2 border-pink-200"></div>
          </motion.div>
        </div>

        {/* Candles */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-6" data-testid="candles-container">
          {candles.map((candle, index) => (
            <motion.div
              key={candle.id}
              className="flex flex-col items-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
            >
              {/* Flame */}
              <AnimatePresence>
                {candle.lit && (
                  <motion.div
                    className="text-4xl candle-flame"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    🔥
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Candle Stick */}
              <div className={`w-4 h-20 bg-gradient-to-b ${candle.color} rounded-full border-2`}></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Microphone/Blow Button */}
      <motion.div
        className="mt-12 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={handleManualBlow}
          disabled={allBlownOut}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="blow-button"
        >
          {isListening ? (
            <>
              <Volume2 className="w-6 h-6 mr-3 animate-pulse" />
              Listening... Blow now!
            </>
          ) : allBlownOut ? (
            "🎉 Wish Made!"
          ) : (
            <>
              <Mic className="w-6 h-6 mr-3" />
              {isSupported ? "Tap to Listen!" : "Tap to Blow!"}
            </>
          )}
        </Button>
        {isSupported && !allBlownOut && (
          <p className="mt-4 text-sm text-muted-foreground">
            {isListening 
              ? "Blow into your microphone to extinguish the candles!"
              : "Click the button and allow microphone access to blow for real!"
            }
          </p>
        )}
        {!isSupported && (
          <p className="mt-4 text-sm text-muted-foreground">
            Microphone not supported - tap to blow manually!
          </p>
        )}
      </motion.div>

      {/* Audio Level Indicator */}
      {isListening && (
        <motion.div
          className="mt-4 mx-auto w-64 h-2 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: `${audioLevel * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      )}

      {/* Wish Card */}
      <AnimatePresence>
        {showWish && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            data-testid="wish-card"
          >
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-primary/30 backdrop-blur">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️
              </motion.div>
              <h3 className="font-serif text-4xl font-bold gradient-text mb-6 mt-4">
                Happy Birthday, Princess! 🎂👑
              </h3>
              <p className="font-script text-2xl md:text-3xl text-foreground leading-relaxed">
                May all your dreams come true, and may this year bring you endless joy, laughter, and magical moments. 
                You deserve the world and so much more! ✨💖
              </p>
              <div className="mt-8 flex justify-center gap-4">
                {['⭐', '👑', '⭐'].map((icon, index) => (
                  <motion.div
                    key={index}
                    className="text-4xl text-accent sparkle-twinkle"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
