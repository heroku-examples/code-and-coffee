import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Coffee, Code } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col items-center justify-center p-8">
      {/* Main Content Container - Optimized for iPad Portrait */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="p-4 bg-heroku-violet-50 rounded-2xl shadow-lg">
              <Coffee className="w-12 h-12 text-heroku-violet-10" />
            </div>
            <div className="text-4xl font-bold text-heroku-purple-95">×</div>
            <div className="p-4 bg-heroku-cloud-70 rounded-2xl shadow-lg">
              <Code className="w-12 h-12 text-heroku-cloud-10" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-heroku-purple-95 leading-tight">
            Code & Coffee
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-heroku-purple-80 leading-relaxed max-w-lg mx-auto">
            Find your perfect coffee blend based on your coding style
          </p>
        </div>

        {/* Feature Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-heroku-purple-10/50 border-heroku-purple-30/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-heroku-purple-60 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-heroku-purple-10">1</span>
              </div>
              <h3 className="text-lg font-semibold text-heroku-purple-95 mb-2">Choose Language</h3>
              <p className="text-sm text-heroku-purple-70">
                Select your favorite programming language
              </p>
            </CardContent>
          </Card>

          <Card className="bg-heroku-violet-10/50 border-heroku-violet-30/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-heroku-violet-50 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-heroku-violet-10">2</span>
              </div>
              <h3 className="text-lg font-semibold text-heroku-purple-95 mb-2">Pick Framework</h3>
              <p className="text-sm text-heroku-purple-70">Choose your development framework</p>
            </CardContent>
          </Card>

          <Card className="bg-heroku-cloud-10/50 border-heroku-cloud-30/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-heroku-cloud-70 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-heroku-cloud-10">3</span>
              </div>
              <h3 className="text-lg font-semibold text-heroku-purple-95 mb-2">Select IDE</h3>
              <p className="text-sm text-heroku-purple-70">Tell us your coding environment</p>
            </CardContent>
          </Card>

          <Card className="bg-heroku-violet-15/50 border-heroku-violet-40/30 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-heroku-violet-60 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-heroku-violet-10">4</span>
              </div>
              <h3 className="text-lg font-semibold text-heroku-purple-95 mb-2">Get Coffee</h3>
              <p className="text-sm text-heroku-purple-70">
                Receive your personalized recommendation
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Button - Large and positioned for easy thumb reach */}
        <div className="w-full flex justify-center pt-8">
          <Link to="/quiz/language" className="w-full max-w-md">
            <Button
              size="lg"
              className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-heroku-violet-50 to-heroku-purple-50 hover:from-heroku-violet-40 hover:to-heroku-purple-40 text-heroku-violet-10 rounded-2xl shadow-lg transform transition-all duration-200 active:scale-95 border border-heroku-violet-60/20"
            >
              Start Coffee Quiz
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-sm text-heroku-purple-70">Perfect for developers at tech conferences</p>
      </div>
    </div>
  );
}
