import { useEffect } from "react";
import CountdownTimer from "@/components/countdown-timer";
import BirthdayCake from "@/components/birthday-cake";
import LoveLetter from "@/components/love-letter";
import MiniGames from "@/components/mini-games";
import FloatingParticles from "@/components/floating-particles";
import { motion } from "framer-motion";
import { Crown, Heart, Star, Sparkles, Calendar, Cake, Underline, Gamepad, Infinity } from "lucide-react";

export default function Home() {
  useEffect(() => {
    document.title = "Happy Birthday Anastasia! 🎂👑";
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, duration: 0.8 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen">
      <FloatingParticles />
      
      {/* Hero Section with Countdown */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 px-4">
        {/* Background Floating Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            className="absolute top-10 left-10 balloon-float"
            animate={{ y: [-20, 20, -20] } as any}
            transition={{ duration: 6, repeat: Infinity as any, ease: "easeInOut" }}
          >
            <Heart className="w-16 h-16 text-primary opacity-70" />
          </motion.div>
          <motion.div 
            className="absolute top-20 right-20 balloon-float"
            animate={{ y: [20, -20, 20] } as any}
            transition={{ duration: 6, repeat: Infinity as any, ease: "easeInOut", delay: 0.5 }}
          >
            <Star className="w-12 h-12 text-accent opacity-60" />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 left-1/4 balloon-float"
            animate={{ y: [-15, 25, -15] } as any}
            transition={{ duration: 6, repeat: Infinity as any, ease: "easeInOut", delay: 1 }}
          >
            <Crown className="w-16 h-16 text-accent opacity-70" />
          </motion.div>
          <motion.div 
            className="absolute top-1/3 right-10 balloon-float"
            animate={{ y: [25, -15, 25] } as any}
            transition={{ duration: 6, repeat: Infinity as any, ease: "easeInOut", delay: 1.5 }}
          >
            <Heart className="w-10 h-10 text-secondary opacity-60" />
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 text-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <Crown className="w-16 h-16 text-accent mb-4 mx-auto" />
            <h1 className="font-serif text-6xl md:text-8xl font-bold gradient-text mb-4">
              Princess Anastasia
            </h1>
            <p className="font-script text-3xl md:text-4xl text-muted-foreground">
              A Special Gift for My Sweet Princess
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div className="mb-12" variants={itemVariants}>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-6 flex items-center justify-center gap-3">
              <Calendar className="w-8 h-8" />
              Countdown to Your Special Day
            </h2>
            <CountdownTimer />
          </motion.div>

          {/* Birthday Message Preview */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/30">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-lg font-medium">October 4th, 2025</span>
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Birthday Cake Section */}
      <section className="relative py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold gradient-text mb-8 flex items-center justify-center gap-3">
              <Cake className="w-12 h-12" />
              Make a Wish!
            </h2>
            <p className="text-xl text-muted-foreground mb-12 font-script">
              Blow out the candles with your microphone! 🎤
            </p>
          </motion.div>
          
          <BirthdayCake />
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-secondary/30 to-primary/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Underline className="w-16 h-16 text-primary mb-4 mx-auto" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold gradient-text mb-4">
              A Letter for You
            </h2>
          </motion.div>
          
          <LoveLetter />
        </div>
      </section>

      {/* Mini Games Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Gamepad className="w-16 h-16 text-accent mb-4 mx-auto" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold gradient-text mb-4">
              Fun Birthday Games!
            </h2>
            <p className="text-xl text-muted-foreground font-script">Let's have some fun, Princess! 🎮✨</p>
          </motion.div>
          
          <MiniGames />
        </div>
      </section>

      {/* Final Message Section */}
      <section className="relative py-20 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl p-12 md:p-16 shadow-2xl border-4 border-primary/40"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ y: [-10, 10, -10] } as any}
              transition={{ duration: 2, repeat: Infinity as any, ease: "easeInOut" }}
            >
              <Crown className="w-20 h-20 text-accent mb-8 mx-auto" />
            </motion.div>
            
            <h2 className="font-serif text-4xl md:text-6xl font-bold gradient-text mb-8">
              You Are My Everything! 👑💖
            </h2>
            <p className="font-script text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
              Every moment with you is a treasure, every day with you is a gift. 
              Happy Birthday to the most amazing princess in the world! 
              May your special day be as wonderful and magical as you are! ✨🎂
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <motion.div
                className="bg-white/80 rounded-2xl px-6 py-4 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Forever Yours</p>
              </motion.div>
              <motion.div
                className="bg-white/80 rounded-2xl px-6 py-4 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Infinity className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="font-semibold">Endless Love</p>
              </motion.div>
              <motion.div
                className="bg-white/80 rounded-2xl px-6 py-4 shadow-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Star className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="font-semibold">You're My Star</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
