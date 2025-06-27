import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ConfettiAnimation = () => {
  const [confetti, setConfetti] = useState<number[]>([]);

  useEffect(() => {
    // Create confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => i);
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map(i => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-heroku-violet-50 to-heroku-purple-50 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;
