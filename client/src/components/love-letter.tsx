import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoveLetter() {
  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-primary/20"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      data-testid="love-letter"
    >
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="font-script text-2xl text-right text-muted-foreground">Моей дорогой Анастасии,</p>
      </motion.div>
      
      <motion.div
        className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p variants={paragraphVariants}>
          В этот особенный день я хочу, чтобы ты знала, как невероятно я счастлив, что ты есть в моей жизни. 
          Ты приносишь так много света, радости и красоты в каждый момент, который мы проводим вместе. 💖
        </motion.p>
        
        <motion.p variants={paragraphVariants}>
          Твоя доброта, твоя улыбка и твое прекрасное сердце делают каждый день ярче. 
          Ты не просто моя принцесса, ты моё всё - моя радость, моё вдохновение, моя навсегда. 👑✨
        </motion.p>
        
        <motion.p variants={paragraphVariants}>
          Празднуя еще один год твоей замечательной жизни, я надеюсь, что ты знаешь, что заслуживаешь 
          всего счастья в мире. Пусть этот день рождения будет наполнен волшебными моментами, 
          сладкими сюрпризами и мечтами, которые сбываются. 🎂🎉
        </motion.p>
        
        <motion.p variants={paragraphVariants}>
          Я обещаю всегда быть рядом с тобой, заставлять тебя улыбаться, поддерживать твои мечты 
          и любить тебя больше с каждым днем. Ты моя принцесса навсегда! 💕👑
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-12 flex items-center justify-between"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex gap-3">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut"
              }}
            >
              <Heart className={`${index === 1 ? 'w-8 h-8' : 'w-6 h-6'} text-primary fill-current`} />
            </motion.div>
          ))}
        </div>
        
        <motion.p 
          className="font-script text-3xl gradient-text"
          animate={{ 
            textShadow: [
              '0 0 10px rgba(255,105,180,0.5)',
              '0 0 20px rgba(255,105,180,0.8)',
              '0 0 10px rgba(255,105,180,0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Со всей моей любовью ❤️
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
