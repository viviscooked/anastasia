import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BalloonGameState {
  active: boolean;
  score: number;
  balloons: Array<{ id: number; x: number; y: number; color: string }>;
}

interface HeartGameState {
  active: boolean;
  score: number;
  basketPosition: number;
  hearts: Array<{ id: number; x: number; y: number }>;
}

interface MemoryCard {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

export default function MiniGames() {
  // Balloon Pop Game State
  const [balloonGame, setBalloonGame] = useState<BalloonGameState>({
    active: false,
    score: 0,
    balloons: []
  });

  // Heart Catching Game State
  const [heartGame, setHeartGame] = useState<HeartGameState>({
    active: false,
    score: 0,
    basketPosition: 50,
    hearts: []
  });

  // Memory Game State
  const memoryIcons = ['👑', '❤️', '⭐', '🌸', '🦋', '💖', '✨', '🎂'];
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const heartGameRef = useRef<HTMLDivElement>(null);
  const balloonIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const heartIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Balloon Pop Game Functions
  const startBalloonGame = () => {
    setBalloonGame({ active: true, score: 0, balloons: [] });
    
    balloonIntervalRef.current = setInterval(() => {
      const newBalloon = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        color: `hue-rotate(${Math.random() * 360}deg)`
      };
      
      setBalloonGame(prev => ({
        ...prev,
        balloons: [...prev.balloons, newBalloon]
      }));

      // Remove balloon after 3 seconds
      setTimeout(() => {
        setBalloonGame(prev => ({
          ...prev,
          balloons: prev.balloons.filter(b => b.id !== newBalloon.id)
        }));
      }, 3000);
    }, 800);

    // End game after 8.5 seconds
    setTimeout(() => {
      if (balloonIntervalRef.current) {
        clearInterval(balloonIntervalRef.current);
      }
      setBalloonGame(prev => ({ ...prev, active: false }));
    }, 8500);
  };

  const popBalloon = (balloonId: number) => {
    setBalloonGame(prev => ({
      ...prev,
      balloons: prev.balloons.filter(b => b.id !== balloonId),
      score: prev.score + 1
    }));
  };

  // Heart Catching Game Functions
  const startHeartGame = () => {
    setHeartGame({ active: true, score: 0, basketPosition: 50, hearts: [] });

    heartIntervalRef.current = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        y: 0
      };
      
      setHeartGame(prev => ({
        ...prev,
        hearts: [...prev.hearts, newHeart]
      }));
    }, 1000);

    // End game after 15 seconds
    setTimeout(() => {
      if (heartIntervalRef.current) {
        clearInterval(heartIntervalRef.current);
      }
      setHeartGame(prev => ({ ...prev, active: false }));
    }, 15000);
  };

  const moveBasket = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!heartGame.active || !heartGameRef.current) return;
    
    const rect = heartGameRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(5, Math.min(95, x));
    
    setHeartGame(prev => ({ ...prev, basketPosition: clampedX }));
  }, [heartGame.active]);

  // Check heart-basket collision
  useEffect(() => {
    if (!heartGame.active) return;

    const checkCollisions = setInterval(() => {
      setHeartGame(prev => {
        const remainingHearts = prev.hearts.filter(heart => {
          const heartBottom = heart.y + 50;
          const basketTop = 80;
          const heartX = heart.x;
          const basketLeft = prev.basketPosition - 5;
          const basketRight = prev.basketPosition + 5;

          if (heartBottom >= basketTop && heartX >= basketLeft && heartX <= basketRight) {
            // Heart caught!
            return false;
          }
          return heart.y < 100;
        });

        const caught = prev.hearts.length - remainingHearts.length;
        
        return {
          ...prev,
          hearts: remainingHearts.map(heart => ({ ...heart, y: heart.y + 2 })),
          score: prev.score + caught
        };
      });
    }, 50);

    return () => clearInterval(checkCollisions);
  }, [heartGame.active]);

  // Memory Game Functions
  const initializeMemoryGame = () => {
    const shuffledIcons = [...memoryIcons, ...memoryIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        flipped: false,
        matched: false
      }));
    
    setMemoryCards(shuffledIcons);
    setFlippedCards([]);
    setMatchedPairs(0);
  };

  const flipMemoryCard = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    if (memoryCards[cardId]?.matched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setMemoryCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      const firstCard = memoryCards[first];
      const secondCard = memoryCards[second];

      setTimeout(() => {
        if (firstCard?.icon === secondCard?.icon) {
          // Match found
          setMemoryCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, matched: true, flipped: true }
              : card
          ));
          setMatchedPairs(prev => prev + 1);
        } else {
          // No match
          setMemoryCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, flipped: false }
              : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Initialize memory game on mount
  useEffect(() => {
    initializeMemoryGame();
  }, []);

  // Cleanup intervals
  useEffect(() => {
    return () => {
      if (balloonIntervalRef.current) clearInterval(balloonIntervalRef.current);
      if (heartIntervalRef.current) clearInterval(heartIntervalRef.current);
    };
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="mini-games">
      {/* Balloon Pop Game */}
      <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-primary/30">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">🎈</div>
          <CardTitle className="font-serif text-2xl">Balloon Pop</CardTitle>
          <p className="text-muted-foreground">Pop all the balloons!</p>
        </CardHeader>
        <CardContent>
          <div 
            className="relative h-64 bg-gradient-to-br from-sky-100 to-sky-200 rounded-2xl overflow-hidden border-2 border-sky-300 mb-4"
            data-testid="balloon-game-area"
          >
            {!balloonGame.active ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  onClick={startBalloonGame}
                  className="bg-primary hover:bg-primary/90"
                  data-testid="start-balloon-game"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <AnimatePresence>
                {balloonGame.balloons.map((balloon) => (
                  <motion.button
                    key={balloon.id}
                    className="absolute text-4xl cursor-pointer hover:scale-125 transition-all"
                    style={{ 
                      left: `${balloon.x}%`, 
                      top: `${balloon.y}%`,
                      filter: balloon.color 
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => popBalloon(balloon.id)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    data-testid={`balloon-${balloon.id}`}
                  >
                    🎈
                  </motion.button>
                ))}
              </AnimatePresence>
            )}
          </div>
          <p className="text-lg font-semibold text-center">
            Score: <span className="gradient-text" data-testid="balloon-score">{balloonGame.score}</span>
          </p>
        </CardContent>
      </Card>

      {/* Catch Falling Hearts */}
      <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-primary/30">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">❤️</div>
          <CardTitle className="font-serif text-2xl">Catch Hearts</CardTitle>
          <p className="text-muted-foreground">Catch the falling hearts!</p>
        </CardHeader>
        <CardContent>
          <div 
            ref={heartGameRef}
            className="relative h-64 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl overflow-hidden border-2 border-pink-300 mb-4 cursor-crosshair"
            onMouseMove={moveBasket}
            data-testid="heart-game-area"
          >
            {!heartGame.active ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  onClick={startHeartGame}
                  className="bg-primary hover:bg-primary/90"
                  data-testid="start-heart-game"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                {/* Falling Hearts */}
                <AnimatePresence>
                  {heartGame.hearts.map((heart) => (
                    <motion.div
                      key={heart.id}
                      className="absolute text-3xl pointer-events-none"
                      style={{ 
                        left: `${heart.x}%`, 
                        top: `${heart.y}%`
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ❤️
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Basket */}
                <motion.div
                  className="absolute bottom-0 text-4xl transform -translate-x-1/2"
                  style={{ left: `${heartGame.basketPosition}%` }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  data-testid="heart-basket"
                >
                  🧺
                </motion.div>
              </>
            )}
          </div>
          <p className="text-lg font-semibold text-center">
            Hearts: <span className="gradient-text" data-testid="hearts-score">{heartGame.score}</span>
          </p>
        </CardContent>
      </Card>

      {/* Memory Card Game */}
      <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-primary/30 md:col-span-2 lg:col-span-1">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">🧩</div>
          <CardTitle className="font-serif text-2xl">Memory Match</CardTitle>
          <p className="text-muted-foreground">Find matching pairs!</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-4" data-testid="memory-game-grid">
            {memoryCards.map((card) => (
              <motion.button
                key={card.id}
                className="relative h-20 rounded-xl border-2 transition-all duration-300"
                onClick={() => flipMemoryCard(card.id)}
                disabled={card.matched || flippedCards.length >= 2}
                whileHover={{ scale: card.matched ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`memory-card-${card.id}`}
              >
                {/* Card Front (Hidden) */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-3xl border-primary/50"
                  animate={{ 
                    rotateY: card.flipped || card.matched ? 180 : 0,
                    opacity: card.flipped || card.matched ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  ❓
                </motion.div>
                
                {/* Card Back (Icon) */}
                <motion.div
                  className="absolute inset-0 bg-white rounded-xl flex items-center justify-center text-3xl border-accent/50"
                  animate={{ 
                    rotateY: card.flipped || card.matched ? 0 : -180,
                    opacity: card.flipped || card.matched ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    opacity: card.matched ? 0.5 : 1
                  }}
                >
                  {card.icon}
                </motion.div>
              </motion.button>
            ))}
          </div>
          
          <div className="text-center space-y-2">
            <Button 
              onClick={initializeMemoryGame}
              className="bg-primary hover:bg-primary/90"
              data-testid="restart-memory-game"
            >
              New Game
            </Button>
            <p className="text-lg font-semibold">
              Pairs: <span className="gradient-text" data-testid="memory-score">{matchedPairs}/8</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
