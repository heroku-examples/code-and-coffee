import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { SiNodedotjs, SiPython, SiOpenjdk, SiGo, SiRuby, SiDotnet, SiPhp } from 'react-icons/si';
import { QUIZ_OPTIONS, type ProgrammingLanguage } from '~/types';
import { motion } from 'framer-motion';
import PageTransition from '~/components/PageTransition';

export default function QuizLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage | null>(null);
  const navigate = useNavigate();

  // Icon mapping for react-icons
  const iconMap = {
    SiNodedotjs: SiNodedotjs,
    SiPython: SiPython,
    SiOpenjdk: SiOpenjdk,
    SiGo: SiGo,
    SiRuby: SiRuby,
    SiDotnet: SiDotnet,
    SiPhp: SiPhp,
  } as const;

  const handleLanguageSelect = (language: ProgrammingLanguage) => {
    setSelectedLanguage(language);
    // Store in sessionStorage for later use
    sessionStorage.setItem('selectedLanguage', language);
  };

  // Auto-navigate after selection with a short delay
  useEffect(() => {
    if (selectedLanguage) {
      const timer = setTimeout(() => {
        navigate('/quiz/tool');
      }, 800); // 800ms delay for visual feedback

      return () => clearTimeout(timer);
    }
  }, [selectedLanguage, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between p-4 landscape:p-6">
          <Link to="/">
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
            <div className="w-3 h-3 bg-heroku-purple-30/50 rounded-full"></div>
            <div className="w-3 h-3 bg-heroku-purple-30/50 rounded-full"></div>
            <div className="w-3 h-3 bg-heroku-purple-30/50 rounded-full"></div>
          </div>
          <div className="w-12 h-12"></div> {/* Spacer for symmetry */}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 landscape:p-8">
          <div className="w-full max-w-5xl mx-auto">
            {/* Question Header */}
            <motion.div
              className="text-center mb-8 landscape:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="mb-4 text-sm px-4 py-2 bg-heroku-purple-80/20 text-heroku-purple-95 border-heroku-purple-60/30"
              >
                Question 1 of 4
              </Badge>
              <h1 className="text-3xl md:text-4xl landscape:text-5xl font-bold text-heroku-purple-95 mb-4 leading-tight">
                What's your go-to programming language?
              </h1>
              <p className="text-lg landscape:text-xl text-heroku-purple-80">
                Choose the language you use most often
              </p>
            </motion.div>

            {/* Language Options Grid - Optimized for iPad Landscape Touch */}
            <motion.div
              className="grid grid-cols-2 landscape:grid-cols-3 gap-3 landscape:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {QUIZ_OPTIONS.languages.map((language, index) => (
                <motion.div
                  key={language.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 transform min-h-[120px] landscape:min-h-[140px] ${
                      selectedLanguage === language.value
                        ? 'bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 border-heroku-violet-60 shadow-xl shadow-heroku-violet-50/30 scale-105'
                        : 'bg-heroku-purple-10/50 border-heroku-purple-30/30 hover:bg-heroku-purple-15/60 backdrop-blur-sm hover:shadow-lg'
                    }`}
                    onClick={() => handleLanguageSelect(language.value)}
                  >
                    <CardContent className="p-4 landscape:p-6 text-center h-full flex flex-col justify-center">
                      {/* Language Icon */}
                      <div className="text-3xl landscape:text-4xl mb-3 flex justify-center">
                        {(() => {
                          const IconComponent = iconMap[language.iconName as keyof typeof iconMap];
                          return (
                            <IconComponent
                              className={`w-8 h-8 landscape:w-10 landscape:h-10 ${
                                selectedLanguage === language.value
                                  ? 'text-heroku-violet-10'
                                  : 'text-heroku-purple-95'
                              }`}
                            />
                          );
                        })()}
                      </div>

                      {/* Language Name */}
                      <h3
                        className={`text-base landscape:text-lg font-semibold ${
                          selectedLanguage === language.value
                            ? 'text-heroku-violet-10'
                            : 'text-heroku-purple-95'
                        }`}
                      >
                        {language.label}
                      </h3>

                      {/* Selection indicator */}
                      {selectedLanguage === language.value && (
                        <motion.div
                          className="mt-2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-2 h-2 bg-heroku-violet-10 rounded-full mx-auto"></div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Auto-progress indicator */}
            {selectedLanguage && (
              <motion.div
                className="text-center mt-6 landscape:mt-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-heroku-purple-70">
                  Great choice! Moving to next question...
                </p>
                <div className="w-32 h-1 bg-heroku-purple-30/50 rounded-full mx-auto mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-heroku-violet-50 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
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
