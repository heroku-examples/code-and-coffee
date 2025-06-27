import { useEffect, useState } from 'react';
import { Coffee, Code } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-8">
        {/* Animated Icons */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="animate-pulse">
            <div className="p-6 bg-gradient-to-br from-heroku-cloud-70 to-heroku-cloud-50 rounded-3xl shadow-lg shadow-heroku-cloud-70/25">
              <Code className="w-16 h-16 text-heroku-cloud-10" />
            </div>
          </div>

          <div className="text-6xl font-bold text-heroku-purple-95 animate-bounce">→</div>

          <div className="animate-pulse delay-300">
            <div className="p-6 bg-gradient-to-br from-heroku-violet-50 to-heroku-purple-50 rounded-3xl shadow-lg shadow-heroku-violet-50/25">
              <Coffee className="w-16 h-16 text-heroku-violet-10" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-heroku-purple-95">
            Brewing your perfect match{dots}
          </h1>

          <div className="space-y-3 text-xl text-heroku-purple-80">
            <p className="animate-pulse">Analyzing your coding style</p>
            <p className="animate-pulse delay-100">Matching flavor profiles</p>
            <p className="animate-pulse delay-200">Preparing your recommendation</p>
          </div>
        </div>

        {/* Code-style Loading Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-heroku-purple-10/80 border border-heroku-purple-30/30 rounded-lg p-4 font-mono text-sm backdrop-blur-sm">
            <div className="text-heroku-cloud-60 mb-2">$ brew install perfect-coffee</div>
            <div className="flex items-center space-x-2">
              <div className="text-heroku-purple-70">Installing dependencies</div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-heroku-violet-50 rounded-full animate-bounce shadow-sm"></div>
                <div className="w-2 h-2 bg-heroku-violet-50 rounded-full animate-bounce delay-100 shadow-sm"></div>
                <div className="w-2 h-2 bg-heroku-violet-50 rounded-full animate-bounce delay-200 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
