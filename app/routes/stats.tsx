import { ArrowLeft, BarChart3 } from 'lucide-react';
import { Link, useLoaderData } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { quizResponsesDb } from '~/lib/db';

interface StatsData {
  totalResponses: number;
  languageStats: Record<string, number>;
  frameworkStats: Record<string, number>;
  ideStats: Record<string, number>;
  vibeStats: Record<string, number>;
}

export async function loader() {
  try {
    const stats = await quizResponsesDb.getResponseStats();
    return stats;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Response('Failed to fetch statistics', { status: 500 });
  }
}

export default function StatsPage() {
  const stats = useLoaderData<StatsData>();

  const renderStatCard = (title: string, data: Record<string, number>) => {
    const sortedData = Object.entries(data).sort(([, a], [, b]) => b - a);

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedData.length > 0 ? (
              sortedData.map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">{key}</span>
                  <Badge variant="secondary" className="font-semibold">
                    {value}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No data available</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-heroku-purple-10 via-heroku-violet-20 to-heroku-cloud-20 flex flex-col">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between p-4 landscape:p-6">
        <Link to="/welcome">
          <Button
            variant="ghost"
            size="lg"
            className="text-heroku-purple-80 hover:text-heroku-purple-95 h-12 w-12 p-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="w-12 h-12"></div> {/* Spacer for symmetry */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 landscape:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <header className="text-center mb-8">
            <Badge
              variant="secondary"
              className="mb-4 text-sm px-4 py-2 bg-heroku-purple-80/20 text-heroku-purple-95 border-heroku-purple-60/30"
            >
              Analytics Dashboard
            </Badge>
            <h1 className="text-3xl md:text-4xl landscape:text-5xl font-bold text-heroku-purple-95 mb-4">
              Programming Preferences Statistics
            </h1>
            <p className="text-lg landscape:text-xl text-heroku-purple-80">
              Based on{' '}
              <Badge variant="outline" className="border-heroku-purple-60/30 text-heroku-purple-90">
                {stats.totalResponses}
              </Badge>{' '}
              quiz responses
            </p>
          </header>

          {stats.totalResponses > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {renderStatCard('Popular Languages', stats.languageStats)}
              {renderStatCard('Popular Frameworks', stats.frameworkStats)}
              {renderStatCard('Popular IDEs', stats.ideStats)}
              {renderStatCard('Popular Vibes', stats.vibeStats)}
            </div>
          ) : (
            <div className="text-center mt-12">
              <Card className="bg-heroku-purple-10/50 border-heroku-purple-30/30 backdrop-blur-sm mx-auto max-w-md">
                <CardContent className="p-8">
                  <BarChart3 className="w-16 h-16 text-heroku-purple-70 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-heroku-purple-95 mb-2">No data yet!</h2>
                  <p className="text-heroku-purple-80 mb-6">
                    Complete the quiz to see programming preferences statistics.
                  </p>
                  <Link to="/welcome">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-heroku-violet-50 to-heroku-purple-50 hover:from-heroku-violet-40 hover:to-heroku-purple-40 text-heroku-violet-10"
                    >
                      Take Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
