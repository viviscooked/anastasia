import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, Wind } from "lucide-react";
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
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const { isListening, audioLevel, startListening, stopListening, isSupported, hasFailed } = useMicrophone();

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
    const newConfetti = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));
    
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4000);
  };

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1500);
  };

  const handleMicrophoneBlow = async () => {
    if (!isListening) {
      await startListening();
    } else {
      stopListening();
    }
  };

  const handleManualBlow = () => {
    blowOutCandles();
    createSparkles();
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

      {/* Sparkles Animation */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute text-3xl pointer-events-none z-40"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
            }}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
              rotate: 180,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          >
            ✨
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative">
        {/* Cake Base */}
        <div className="relative">
          {/* Top Tier */}
          <motion.div 
            className="relative mx-auto w-48 h-32 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-full border-4 border-pink-400 shadow-xl"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: [
                "0 20px 25px -5px rgba(236, 72, 153, 0.3)",
                "0 20px 25px -5px rgba(236, 72, 153, 0.6)",
                "0 20px 25px -5px rgba(236, 72, 153, 0.3)",
              ]
            }}
            transition={{ 
              scale: { delay: 0.2, type: "spring", stiffness: 200 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-transparent rounded-t-full"></div>
            {/* Frosting Decorations */}
            <motion.div 
              className="absolute -top-2 left-1/4 w-8 h-8 bg-white rounded-full border-2 border-pink-300 shadow-lg"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            ></motion.div>
            <motion.div 
              className="absolute -top-2 right-1/4 w-8 h-8 bg-white rounded-full border-2 border-pink-300 shadow-lg"
              animate={{ 
                rotate: -360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
            ></motion.div>
            {/* Sparkle decorations */}
            <motion.div
              className="absolute top-1/2 left-4 text-2xl"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-4 text-2xl"
              animate={{ 
                scale: [1.2, 0.8, 1.2],
                rotate: [360, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              ⭐
            </motion.div>
          </motion.div>
          
          {/* Middle Tier */}
          <motion.div 
            className="relative mx-auto w-64 h-40 bg-gradient-to-b from-purple-200 to-purple-300 border-4 border-purple-400 -mt-4 shadow-xl"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: [
                "0 20px 25px -5px rgba(192, 132, 252, 0.3)",
                "0 20px 25px -5px rgba(192, 132, 252, 0.6)",
                "0 20px 25px -5px rgba(192, 132, 252, 0.3)",
              ]
            }}
            transition={{ 
              scale: { delay: 0.4, type: "spring", stiffness: 200 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-transparent"></div>
            {/* Decorative Hearts */}
            <motion.div
              className="absolute top-4 left-8 text-2xl"
              animate={{ 
                scale: [1, 1.3, 1],
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            <motion.div
              className="absolute top-4 right-8 text-2xl"
              animate={{ 
                scale: [1.3, 1, 1.3],
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ❤️
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-3xl"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              ⭐
            </motion.div>
            {/* Additional crown decoration */}
            <motion.div
              className="absolute top-1/2 left-4 text-xl"
              animate={{ 
                y: [-3, 3, -3],
                rotate: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              👑
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-4 text-xl"
              animate={{ 
                y: [3, -3, 3],
                rotate: [0, -10, 0, 10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              👑
            </motion.div>
          </motion.div>
          
          {/* Bottom Tier */}
          <motion.div 
            className="relative mx-auto w-80 h-48 bg-gradient-to-b from-pink-300 to-pink-400 rounded-b-3xl border-4 border-pink-500 -mt-4 shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: [
                "0 25px 50px -12px rgba(236, 72, 153, 0.4)",
                "0 25px 50px -12px rgba(236, 72, 153, 0.7)",
                "0 25px 50px -12px rgba(236, 72, 153, 0.4)",
              ]
            }}
            transition={{ 
              scale: { delay: 0.6, type: "spring", stiffness: 200 },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 to-transparent rounded-b-3xl"></div>
            {/* Bottom Decorations */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-8 bg-white/30 rounded-b-3xl border-t-2 border-pink-200"
              animate={{ 
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Floating decorations around cake */}
            <motion.div
              className="absolute bottom-1/4 left-2 text-2xl"
              animate={{ 
                y: [-5, 5, -5],
                x: [-2, 2, -2]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌸
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 right-2 text-2xl"
              animate={{ 
                y: [5, -5, 5],
                x: [2, -2, 2]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              🦋
            </motion.div>
            <motion.div
              className="absolute top-1/3 left-6 text-xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 6, repeat: Infinity },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              💖
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-6 text-xl"
              animate={{ 
                rotate: [360, 0],
                scale: [1.2, 1, 1.2]
              }}
              transition={{ 
                rotate: { duration: 6, repeat: Infinity },
                scale: { duration: 2, repeat: Infinity, delay: 0.3 }
              }}
            >
              💖
            </motion.div>
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
                    animate={{ 
                      scale: [1, 1.1, 1],
                      y: [-2, 2, -2],
                      rotate: [-5, 5, -5]
                    }}
                    exit={{ scale: 0, opacity: 0, y: -20 }}
                    transition={{ 
                      scale: { duration: 0.5, repeat: Infinity },
                      y: { duration: 0.8, repeat: Infinity },
                      rotate: { duration: 1, repeat: Infinity }
                    }}
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

      {/* Blow Buttons */}
      <motion.div
        className="mt-12 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {!allBlownOut ? (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Manual Blow Button */}
            <Button
              onClick={handleManualBlow}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              data-testid="manual-blow-button"
            >
              <Wind className="w-6 h-6 mr-3" />
              Задуть Вручную!
            </Button>

            {/* Microphone Button */}
            {isSupported && !hasFailed && (
              <Button
                onClick={handleMicrophoneBlow}
                variant={isListening ? "default" : "outline"}
                className={`font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                  isListening ? "bg-accent hover:bg-accent/90 text-white" : ""
                }`}
                data-testid="microphone-blow-button"
              >
                {isListening ? (
                  <>
                    <Volume2 className="w-6 h-6 mr-3 animate-pulse" />
                    Слушаю...
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6 mr-3" />
                    Микрофон
                  </>
                )}
              </Button>
            )}
          </div>
        ) : (
          <Button
            disabled
            className="bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg opacity-50 cursor-not-allowed"
            data-testid="blow-button"
          >
            🎉 Желание Загадано!
          </Button>
        )}
        
        <div className="mt-4 space-y-2">
          {isListening && (
            <p className="text-sm text-muted-foreground animate-pulse">
              Дуй в микрофон, чтобы погасить свечи! 🎤
            </p>
          )}
          {!allBlownOut && !isListening && (
            <p className="text-sm text-muted-foreground">
              Выбери способ: задуй вручную или используй микрофон! 💨
            </p>
          )}
        </div>
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
                С Днем Рождения, Принцесса! 🎂👑
              </h3>
              <p className="font-script text-2xl md:text-3xl text-foreground leading-relaxed">
                Пусть все твои мечты сбудутся, и пусть этот год принесет тебе бесконечную радость, смех и волшебные моменты. 
                Ты заслуживаешь весь мир и гораздо больше! ✨💖
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
