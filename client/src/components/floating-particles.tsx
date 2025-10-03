import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  icon: string;
  duration: number;
  delay: number;
}

const PARTICLE_ICONS = ['❤️', '⭐', '✨', '👑', '💖', '🌸', '🦋'];

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticle = () => {
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        icon: PARTICLE_ICONS[Math.floor(Math.random() * PARTICLE_ICONS.length)],
        duration: Math.random() * 3 + 4, // 4-7 seconds
        delay: Math.random() * 2, // 0-2 seconds delay
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, (newParticle.duration + newParticle.delay) * 1000);
    };

    const interval = setInterval(createParticle, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-2xl"
            style={{ left: `${particle.x}%` }}
            initial={{ y: "100vh", opacity: 0, rotate: 0 }}
            animate={{ 
              y: "-100px", 
              opacity: [0, 1, 1, 0],
              rotate: 360,
              scale: [0.8, 1.2, 1, 0.8]
            }}
            transition={{ 
              duration: particle.duration,
              delay: particle.delay,
              ease: "linear",
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: particle.duration
              },
              scale: {
                duration: particle.duration / 2,
                repeat: Math.floor(particle.duration),
                repeatType: "reverse"
              }
            }}
            exit={{ opacity: 0 }}
          >
            {particle.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
