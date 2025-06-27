import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QUIZ_OPTIONS } from '~/types';

export default function QuizIDE() {
  const [selectedIDE, setSelectedIDE] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleIDESelect = (ide: string) => {
    setSelectedIDE(ide);
    // Store in sessionStorage for later use
    sessionStorage.setItem('selectedIDE', ide);
  };

  const handleNext = () => {
    if (selectedIDE) {
      navigate('/quiz/vibe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-6">
        <Link to="/quiz/tool">
          <Button
            variant="ghost"
            size="lg"
            className="text-heroku-purple-80 hover:text-heroku-purple-95 h-12 w-12 p-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        {/* Progress Indicator */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-heroku-purple-30/50 rounded-full"></div>
        </div>
        <div className="w-12 h-12"></div> {/* Spacer for symmetry */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl mx-auto">
          {/* Question Header */}
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-4 text-sm px-4 py-2 bg-heroku-purple-80/20 text-heroku-purple-95 border-heroku-purple-60/30"
            >
              Question 3 of 4
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-heroku-purple-95 mb-4 leading-tight">
              What's your preferred IDE?
            </h1>
            <p className="text-xl text-heroku-purple-80">
              Choose your coding environment of choice
            </p>
          </div>

          {/* IDE Options Grid - Optimized for iPad Touch */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {QUIZ_OPTIONS.ides.map(ide => (
              <Card
                key={ide.value}
                className={`cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  selectedIDE === ide.value
                    ? 'bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 border-heroku-violet-60 shadow-lg shadow-heroku-violet-50/25'
                    : 'bg-heroku-purple-10/50 border-heroku-purple-30/30 hover:bg-heroku-purple-15/60 backdrop-blur-sm'
                }`}
                onClick={() => handleIDESelect(ide.value)}
              >
                <CardContent className="p-6 text-center min-h-[120px] flex flex-col justify-center">
                  {/* IDE Icon */}
                  <div className="text-3xl mb-3">{ide.icon}</div>

                  {/* IDE Name */}
                  <h3
                    className={`text-lg font-semibold ${
                      selectedIDE === ide.value ? 'text-heroku-violet-10' : 'text-heroku-purple-95'
                    }`}
                  >
                    {ide.label}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed position for easy thumb reach */}
      <div className="p-8">
        <div className="w-full max-w-md mx-auto">
          <Button
            onClick={handleNext}
            disabled={!selectedIDE}
            size="lg"
            className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-heroku-violet-50 to-heroku-purple-50 hover:from-heroku-violet-40 hover:to-heroku-purple-40 disabled:from-heroku-purple-30/50 disabled:to-heroku-purple-30/50 disabled:text-heroku-purple-70 text-heroku-violet-10 rounded-2xl shadow-lg transform transition-all duration-200 active:scale-95 border border-heroku-violet-60/20"
          >
            Next Step
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
