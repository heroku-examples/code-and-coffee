import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QUIZ_OPTIONS } from '~/types';

export default function QuizVibe() {
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVibeSelect = (vibe: string) => {
    setSelectedVibe(vibe);
    // Store in sessionStorage for later use
    sessionStorage.setItem('selectedVibe', vibe);
  };

  const handleGetRecommendation = async () => {
    if (!selectedVibe) return;

    // Get all selections from sessionStorage
    const language = sessionStorage.getItem('selectedLanguage');
    const framework = sessionStorage.getItem('selectedFramework');
    const ide = sessionStorage.getItem('selectedIDE');

    if (language && framework && ide) {
      // Navigate to loading screen
      navigate('/loading');

      // Make API call
      try {
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
      } catch {
        alert('Something went wrong. Please try again.');
        navigate('/welcome');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-6">
        <Link to="/quiz/ide">
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
          <div className="w-3 h-3 bg-heroku-violet-50 rounded-full shadow-sm"></div>
        </div>
        <div className="w-12 h-12"></div> {/* Spacer for symmetry */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-3xl mx-auto">
          {/* Question Header */}
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="mb-4 text-sm px-4 py-2 bg-heroku-purple-80/20 text-heroku-purple-95 border-heroku-purple-60/30"
            >
              Question 4 of 4
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-heroku-purple-95 mb-4 leading-tight">
              What's your coding vibe?
            </h1>
            <p className="text-xl text-heroku-purple-80">How do you approach problem-solving?</p>
          </div>

          {/* Vibe Options - Vertical layout for better readability */}
          <div className="space-y-4 mb-12">
            {QUIZ_OPTIONS.vibes.map(vibe => (
              <Card
                key={vibe.value}
                className={`cursor-pointer transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
                  selectedVibe === vibe.value
                    ? 'bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 border-heroku-violet-60 shadow-lg shadow-heroku-violet-50/25'
                    : 'bg-heroku-purple-10/50 border-heroku-purple-30/30 hover:bg-heroku-purple-15/60 backdrop-blur-sm'
                }`}
                onClick={() => handleVibeSelect(vibe.value)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col space-y-3">
                    {/* Vibe Title */}
                    <h3
                      className={`text-2xl font-bold ${
                        selectedVibe === vibe.value
                          ? 'text-heroku-violet-10'
                          : 'text-heroku-purple-95'
                      }`}
                    >
                      {vibe.label}
                    </h3>

                    {/* Vibe Description */}
                    <p
                      className={`text-lg leading-relaxed ${
                        selectedVibe === vibe.value
                          ? 'text-heroku-violet-20'
                          : 'text-heroku-purple-80'
                      }`}
                    >
                      {vibe.description}
                    </p>
                  </div>
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
            onClick={handleGetRecommendation}
            disabled={!selectedVibe}
            size="lg"
            className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-heroku-violet-50 to-heroku-purple-50 hover:from-heroku-violet-40 hover:to-heroku-purple-40 disabled:from-heroku-purple-30/50 disabled:to-heroku-purple-30/50 disabled:text-heroku-purple-70 text-heroku-violet-10 rounded-2xl shadow-lg transform transition-all duration-200 active:scale-95 border border-heroku-violet-60/20"
          >
            Get My Coffee
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
