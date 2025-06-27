import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeInOut' as const, // Gentle, smooth easing
  duration: 0.4,
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20"
      style={{
        // Ensure smooth transitions without white flash
        willChange: 'opacity',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
