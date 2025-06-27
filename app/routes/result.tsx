import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Coffee, RotateCcw, Share } from 'lucide-react';
import type { RecommendationResponse } from '~/types';

export default function Result() {
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);

  useEffect(() => {
    // Get recommendation from sessionStorage
    const stored = sessionStorage.getItem('recommendation');
    if (stored) {
      try {
        setRecommendation(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse recommendation:', error);
      }
    }
  }, []);

  const handleStartOver = () => {
    // Clear all session data
    sessionStorage.clear();
  };

  const handleShare = async () => {
    if (!recommendation) return;

    const shareText = `I just discovered my perfect developer coffee: ${recommendation.coffeeName}! 🚀☕ Try the Code & Coffee quiz to find yours.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Perfect Developer Coffee',
          text: shareText,
        });
      } catch {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Copied to clipboard!');
      } catch {
        alert('Unable to share. Please take a screenshot!');
      }
    }
  };

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-heroku-purple-95 mb-4">No recommendation found</h1>
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col">
      {/* Header */}
      <div className="text-center p-6">
        <Badge
          variant="secondary"
          className="mb-4 text-sm px-4 py-2 bg-heroku-purple-80/20 text-heroku-purple-95 border-heroku-purple-60/30"
        >
          Your Perfect Match
        </Badge>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          {/* Coffee Recommendation Card */}
          <Card className="bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 border-heroku-violet-60 shadow-2xl shadow-heroku-violet-50/25">
            <CardContent className="p-8 text-center">
              {/* Coffee Icon */}
              <div className="mb-6">
                <div className="p-6 bg-heroku-violet-10 rounded-full inline-block shadow-lg">
                  <Coffee className="w-16 h-16 text-heroku-violet-50" />
                </div>
              </div>

              {/* Coffee Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-heroku-violet-10 mb-4 leading-tight">
                {recommendation.coffeeName}
              </h1>

              {/* Flavor Profile */}
              <p className="text-xl text-heroku-violet-20 font-medium mb-6">
                {recommendation.flavorProfile}
              </p>
            </CardContent>
          </Card>

          {/* Reasoning Card */}
          <Card className="bg-heroku-purple-10/50 border-heroku-purple-30/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-heroku-purple-95 mb-4">Why this coffee?</h2>
              <p className="text-lg text-heroku-purple-80 leading-relaxed">
                {recommendation.reasoning}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Share Button */}
            <Button
              onClick={handleShare}
              size="lg"
              variant="outline"
              className="w-full h-16 text-xl font-semibold border-heroku-violet-50 text-heroku-violet-50 hover:bg-heroku-violet-50 hover:text-heroku-violet-10 rounded-2xl backdrop-blur-sm"
            >
              <Share className="w-6 h-6 mr-3" />
              Share My Coffee
            </Button>

            {/* Start Over Button */}
            <Link to="/welcome" onClick={handleStartOver} className="block">
              <Button
                size="lg"
                className="w-full h-16 text-xl font-semibold bg-heroku-purple-15/80 hover:bg-heroku-purple-20/80 text-heroku-purple-95 rounded-2xl backdrop-blur-sm border border-heroku-purple-30/30"
              >
                <RotateCcw className="w-6 h-6 mr-3" />
                Try Another Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center p-6">
        <p className="text-sm text-heroku-purple-70">Enjoy your perfect developer brew! ☕</p>
      </div>
    </div>
  );
}
