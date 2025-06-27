import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Coffee, RotateCcw } from 'lucide-react';
import type { RecommendationResponse } from '~/types';
import { motion } from 'framer-motion';
import PageTransition from '~/components/PageTransition';
import ConfettiAnimation from '~/components/ConfettiAnimation';

export default function Result() {
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Get recommendation from sessionStorage
    const stored = sessionStorage.getItem('recommendation');
    if (stored) {
      try {
        setRecommendation(JSON.parse(stored));
        // Show confetti after component mounts
        setTimeout(() => setShowConfetti(true), 500);
      } catch (error) {
        console.error('Failed to parse recommendation:', error);
      }
    }
  }, []);

  const handleStartOver = () => {
    // Clear all session data
    sessionStorage.clear();
  };

  if (!recommendation) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col items-center justify-center p-4 landscape:p-8">
          <div className="text-center">
            <h1 className="text-2xl landscape:text-3xl font-bold text-heroku-purple-95 mb-4">
              No recommendation found
            </h1>
            <Link to="/welcome">
              <Button
                size="lg"
                className="bg-gradient-to-r from-heroku-violet-50 to-heroku-purple-50 hover:from-heroku-violet-40 hover:to-heroku-purple-40 text-heroku-violet-10"
              >
                Start Over
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col">
        {/* Confetti Animation */}
        {showConfetti && <ConfettiAnimation />}

        {/* Header */}
        <motion.div
          className="text-center p-4 landscape:p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="secondary"
            className="mb-4 text-sm px-4 py-2 bg-heroku-purple-80/20 text-heroku-purple-95 border-heroku-purple-60/30"
          >
            Your Perfect Match
          </Badge>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 landscape:p-8">
          <div className="w-full max-w-3xl landscape:max-w-4xl mx-auto space-y-6 landscape:space-y-8">
            {/* Coffee Recommendation Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 border-heroku-violet-60 shadow-2xl shadow-heroku-violet-50/25">
                <CardContent className="p-6 landscape:p-8 text-center">
                  {/* Coffee Icon */}
                  <motion.div
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 200 }}
                  >
                    <div className="p-4 landscape:p-6 bg-heroku-violet-10 rounded-full inline-block shadow-lg">
                      <Coffee className="w-12 h-12 landscape:w-16 landscape:h-16 text-heroku-violet-50" />
                    </div>
                  </motion.div>

                  {/* Coffee Name */}
                  <motion.h1
                    className="text-3xl md:text-4xl landscape:text-5xl font-bold text-heroku-violet-10 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {recommendation.coffeeName}
                  </motion.h1>

                  {/* Flavor Profile */}
                  <motion.p
                    className="text-lg landscape:text-xl text-heroku-violet-20 font-medium mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    {recommendation.flavorProfile}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reasoning Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Card className="bg-heroku-purple-10/50 border-heroku-purple-30/30 backdrop-blur-sm">
                <CardContent className="p-6 landscape:p-8">
                  <h2 className="text-xl landscape:text-2xl font-bold text-heroku-purple-95 mb-4">
                    Why this coffee?
                  </h2>
                  <p className="text-base landscape:text-lg text-heroku-purple-80 leading-relaxed">
                    {recommendation.reasoning}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Start Over Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <Link to="/welcome" onClick={handleStartOver} className="block">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="w-full h-14 landscape:h-16 text-lg landscape:text-xl font-semibold bg-heroku-purple-15/80 hover:bg-heroku-purple-20/80 text-heroku-purple-95 rounded-2xl backdrop-blur-sm border border-heroku-purple-30/30"
                  >
                    <RotateCcw className="w-5 h-5 landscape:w-6 landscape:h-6 mr-3" />
                    Try Another Quiz
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center p-4 landscape:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-sm text-heroku-purple-70">Enjoy your perfect developer brew! ☕</p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
