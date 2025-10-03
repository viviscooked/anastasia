import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-10-04T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsBirthday(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isBirthday) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-center"
      >
        <h3 className="font-serif text-4xl md:text-6xl gradient-text">
          🎉 С Днем Рождения, Принцесса! 🎉
        </h3>
      </motion.div>
    );
  }

  const timeUnits = [
    { label: "Дни", value: timeLeft.days, id: "days" },
    { label: "Часы", value: timeLeft.hours, id: "hours" },
    { label: "Минуты", value: timeLeft.minutes, id: "minutes" },
    { label: "Секунды", value: timeLeft.seconds, id: "seconds" },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8 flex-wrap" data-testid="countdown-timer">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.id}
          className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl border-2 border-primary/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          data-testid={`countdown-${unit.id}`}
        >
          <motion.div
            key={unit.value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-5xl md:text-6xl font-bold gradient-text"
          >
            {unit.value.toString().padStart(2, '0')}
          </motion.div>
          <div className="text-sm md:text-base text-muted-foreground uppercase mt-2">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
