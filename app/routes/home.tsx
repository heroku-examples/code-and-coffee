import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { Route } from './+types/home';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Code & Coffee - Find Your Perfect Developer Brew' },
    {
      name: 'description',
      content:
        'Discover your perfect coffee blend based on your coding style. Perfect for tech conferences!',
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome screen
    navigate('/welcome', { replace: true });
  }, [navigate]);

  return <div>Redirecting...</div>;
}
