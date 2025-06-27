import { useEffect, useState } from 'react';
import { Coffee, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '~/components/PageTransition';
import CompileAnimation from '~/components/CompileAnimation';

export default function Loading() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col items-center justify-center p-4 landscape:px-8">
        <div className="text-center space-y-6 landscape:space-y-8 max-w-4xl mx-auto">
          {/* Animated Icons */}
          <motion.div
            className="flex items-center justify-center space-x-6 landscape:space-x-8 mb-6 landscape:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="p-4 landscape:p-6 bg-gradient-to-br from-heroku-cloud-70 to-heroku-cloud-50 rounded-3xl shadow-lg shadow-heroku-cloud-70/25">
                <Code className="w-12 h-12 landscape:w-16 landscape:h-16 text-heroku-cloud-10" />
              </div>
            </motion.div>

            <motion.div
              className="text-4xl landscape:text-6xl font-bold text-heroku-purple-95"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.div>

            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="p-4 landscape:p-6 bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 rounded-3xl shadow-lg shadow-heroku-violet-50/25">
                <Coffee className="w-12 h-12 landscape:w-16 landscape:h-16 text-heroku-violet-10" />
              </div>
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="space-y-3 landscape:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl landscape:text-5xl font-bold text-heroku-purple-95">
              Brewing your perfect match{dots}
            </h1>

            <div className="space-y-2 landscape:space-y-3 text-lg landscape:text-xl text-heroku-purple-80">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Analyzing your coding style
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                Matching flavor profiles
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Preparing your recommendation
              </motion.p>
            </div>
          </motion.div>

          {/* Enhanced Loading Animation */}
          <motion.div
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <CompileAnimation />
          </motion.div>

          {/* Code-style Loading Bar */}
          <motion.div
            className="w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="bg-heroku-purple-10/80 border border-heroku-purple-30/30 rounded-lg p-3 landscape:p-4 font-mono text-sm backdrop-blur-sm">
              <div className="text-heroku-cloud-60 mb-2">$ brew install perfect-coffee</div>
              <div className="flex items-center space-x-2">
                <div className="text-heroku-purple-70 text-xs landscape:text-sm">
                  Installing dependencies
                </div>
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-heroku-violet-50 rounded-full shadow-sm"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-heroku-violet-50 rounded-full shadow-sm"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-heroku-violet-50 rounded-full shadow-sm"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
