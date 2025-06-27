import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Coffee, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageTransition from '~/components/PageTransition';

const TAGLINES = [
  "Because debugging at 3 AM requires premium fuel",
  "Scale your caffeine like you scale on Heroku",
  "From git push heroku main to perfect cup",
  "The only algorithm that matters before 10 AM",
  "Deploy your morning routine to production",
  "Your IDE has syntax highlighting, your coffee should too",
  "Pair programming with the perfect brew",
  "Heroku for your coffee stack",
  "Zero-downtime coffee deployment",
  "Build, deploy, caffeinate, repeat",
  "Version control for your coffee preferences",
  "Auto-scaling your energy levels since 2024"
];

export default function Welcome() {
  const [tagline, setTagline] = useState('');

  useEffect(() => {
    // Select a random tagline on component mount
    const randomTagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];
    setTagline(randomTagline);
  }, []);
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col items-center justify-center p-4 landscape:px-8">
        {/* Main Content Container - Optimized for iPad Landscape */}
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center space-y-8 landscape:space-y-6">
          {/* Hero Section */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo/Icon */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div
                className="p-4 bg-heroku-violet-50 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Coffee className="w-12 h-12 text-heroku-violet-10" />
              </motion.div>
              <div className="text-4xl font-bold text-heroku-purple-95">×</div>
              <motion.div
                className="p-4 bg-heroku-cloud-70 rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code className="w-12 h-12 text-heroku-cloud-10" />
              </motion.div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl landscape:text-6xl font-bold text-heroku-purple-95 leading-tight">
              Code & Coffee
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl landscape:text-2xl text-heroku-purple-80 leading-relaxed max-w-2xl mx-auto">
              Find your perfect coffee blend based on your coding style
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="w-full grid grid-cols-2 landscape:grid-cols-4 gap-4 landscape:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
              <Card className="bg-heroku-purple-10/50 border-heroku-purple-30/30 backdrop-blur-sm h-full min-h-[140px] landscape:min-h-[160px]">
                <CardContent className="p-4 landscape:p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-10 h-10 landscape:w-12 landscape:h-12 bg-heroku-purple-60 rounded-xl mx-auto mb-3 landscape:mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-lg landscape:text-xl font-bold text-heroku-purple-10">
                      1
                    </span>
                  </div>
                  <h3 className="text-base landscape:text-lg font-semibold text-heroku-purple-95 mb-2">
                    Choose Language
                  </h3>
                  <p className="text-sm text-heroku-purple-70 leading-relaxed">
                    Select your favorite programming language
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
              <Card className="bg-heroku-violet-10/50 border-heroku-violet-30/30 backdrop-blur-sm h-full min-h-[140px] landscape:min-h-[160px]">
                <CardContent className="p-4 landscape:p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-10 h-10 landscape:w-12 landscape:h-12 bg-heroku-violet-50 rounded-xl mx-auto mb-3 landscape:mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-lg landscape:text-xl font-bold text-heroku-violet-10">
                      2
                    </span>
                  </div>
                  <h3 className="text-base landscape:text-lg font-semibold text-heroku-purple-95 mb-2">
                    Pick Framework
                  </h3>
                  <p className="text-sm text-heroku-purple-70 leading-relaxed">
                    Choose your development framework
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
              <Card className="bg-heroku-cloud-10/50 border-heroku-cloud-30/30 backdrop-blur-sm h-full min-h-[140px] landscape:min-h-[160px]">
                <CardContent className="p-4 landscape:p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-10 h-10 landscape:w-12 landscape:h-12 bg-heroku-cloud-70 rounded-xl mx-auto mb-3 landscape:mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-lg landscape:text-xl font-bold text-heroku-cloud-10">
                      3
                    </span>
                  </div>
                  <h3 className="text-base landscape:text-lg font-semibold text-heroku-purple-95 mb-2">
                    Select IDE
                  </h3>
                  <p className="text-sm text-heroku-purple-70 leading-relaxed">
                    Tell us your coding environment
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
              <Card className="bg-heroku-violet-15/50 border-heroku-violet-40/30 backdrop-blur-sm h-full min-h-[140px] landscape:min-h-[160px]">
                <CardContent className="p-4 landscape:p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-10 h-10 landscape:w-12 landscape:h-12 bg-heroku-violet-60 rounded-xl mx-auto mb-3 landscape:mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-lg landscape:text-xl font-bold text-heroku-violet-10">
                      4
                    </span>
                  </div>
                  <h3 className="text-base landscape:text-lg font-semibold text-heroku-purple-95 mb-2">
                    Get Coffee
                  </h3>
                  <p className="text-sm text-heroku-purple-70 leading-relaxed">
                    Receive your personalized recommendation
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* CTA Button - Large and positioned for easy thumb reach */}
          <motion.div
            className="w-full flex justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/quiz/language" className="w-full max-w-md">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="w-full h-14 landscape:h-16 text-lg landscape:text-xl font-semibold bg-gradient-to-r from-heroku-violet-50 to-heroku-purple-50 hover:from-heroku-violet-40 hover:to-heroku-purple-40 text-heroku-violet-10 rounded-2xl shadow-lg transform transition-all duration-200 border border-heroku-violet-60/20"
                >
                  Start Coffee Quiz
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 landscape:bottom-6 text-center">
          <motion.p 
            className="text-sm text-heroku-purple-70 max-w-sm mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {tagline}
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
}
