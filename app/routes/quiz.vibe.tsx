import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { QUIZ_OPTIONS } from '~/types';
import { motion } from 'framer-motion';
import PageTransition from '~/components/PageTransition';
import { getOrCreateSessionId } from '~/lib/session';

export default function QuizVibe() {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVibeSelect = (vibe: string) => {
    setSelectedVibe(vibe);
    // Store in sessionStorage for later use
    sessionStorage.setItem('selectedVibe', vibe);
  };

  // Auto-process recommendation after selection
  useEffect(() => {
    if (selectedVibe) {
      const timer = setTimeout(async () => {
        // Get all selections from sessionStorage
        const language = sessionStorage.getItem('selectedLanguage');
        const framework = sessionStorage.getItem('selectedFramework');
        const ide = sessionStorage.getItem('selectedIDE');

        if (language && framework && ide) {
          // Navigate to loading screen
          navigate('/loading');

          try {
            // First, save the complete response to the database
            const sessionId = getOrCreateSessionId();

            await fetch('/api/responses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                sessionId,
                language,
                framework,
                ide,
                vibe: selectedVibe,
              }),
            });

            console.log('Quiz response saved to database for session:', sessionId);

            // Then make recommendation API call
            const response = await fetch('/api/recommendation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                language,
                framework,
                ide,
                vibe: selectedVibe,
              }),
            });

            const result = await response.json();

            if (response.ok) {
              // Store result and navigate to result screen
              sessionStorage.setItem('recommendation', JSON.stringify(result));
              navigate('/result');
            } else {
              // Handle error - for now just alert
              alert(`Error: ${result.error}`);
              navigate('/welcome');
            }
          } catch (error) {
            console.error('Error during quiz completion:', error);
            alert('Something went wrong. Please try again.');
            navigate('/welcome');
          }
        }
      }, 1200); // Longer delay for final question

      return () => clearTimeout(timer);
    }
  }, [selectedVibe, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between p-4 landscape:p-6">
          <Link to="/quiz/ide">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="lg"
                className="text-heroku-purple-80 hover:text-heroku-purple-95 h-12 w-12 p-0"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </motion.div>
          </Link>
          {/* Progress Indicator */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
            <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
          </div>
          <div className="w-12 h-12"></div> {/* Spacer for symmetry */}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 landscape:p-8">
          <div className="w-full max-w-4xl landscape:max-w-5xl mx-auto">
            {/* Question Header */}
            <motion.div
              className="text-center mb-8 landscape:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="mb-4 text-sm px-4 py-2 bg-heroku-purple-80/20 text-heroku-purple-95 border-heroku-purple-60/30"
              >
                Question 4 of 4
              </Badge>
              <h1 className="text-3xl md:text-4xl landscape:text-5xl font-bold text-heroku-purple-95 mb-4 leading-tight">
                What's your coding vibe?
              </h1>
              <p className="text-lg landscape:text-xl text-heroku-purple-80">
                How do you approach problem-solving?
              </p>
            </motion.div>

            {/* Vibe Options Grid - Optimized for iPad Landscape */}
            <motion.div
              className="grid grid-cols-1 landscape:grid-cols-2 gap-3 landscape:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {QUIZ_OPTIONS.vibes.map((vibe, index) => (
                <motion.div
                  key={vibe.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 transform min-h-[140px] landscape:min-h-[160px] ${
                      selectedVibe === vibe.value
                        ? 'bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 border-heroku-violet-60 shadow-xl shadow-heroku-violet-50/30 scale-105'
                        : 'bg-heroku-purple-10/50 border-heroku-purple-30/30 hover:bg-heroku-purple-15/60 backdrop-blur-sm hover:shadow-lg'
                    }`}
                    onClick={() => handleVibeSelect(vibe.value)}
                  >
                    <CardContent className="p-4 landscape:p-6 h-full flex flex-col justify-center">
                      <div className="flex flex-col space-y-2 landscape:space-y-3">
                        {/* Vibe Title */}
                        <h3
                          className={`text-lg landscape:text-xl font-bold ${
                            selectedVibe === vibe.value
                              ? 'text-heroku-violet-10'
                              : 'text-heroku-purple-95'
                          }`}
                        >
                          {vibe.label}
                        </h3>

                        {/* Vibe Description */}
                        <p
                          className={`text-sm landscape:text-base leading-relaxed ${
                            selectedVibe === vibe.value
                              ? 'text-heroku-violet-20'
                              : 'text-heroku-purple-80'
                          }`}
                        >
                          {vibe.description}
                        </p>

                        {/* Selection indicator */}
                        {selectedVibe === vibe.value && (
                          <motion.div
                            className="pt-2"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="w-2 h-2 bg-heroku-violet-10 rounded-full"></div>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Auto-progress indicator */}
            {selectedVibe && (
              <motion.div
                className="text-center mt-6 landscape:mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-heroku-purple-70">
                  Perfect! Preparing your coffee recommendation...
                </p>
                <div className="w-48 h-1 bg-heroku-purple-30/50 rounded-full mx-auto mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-heroku-violet-50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2 }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
