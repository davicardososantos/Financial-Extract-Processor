'use client';

import { useHome } from '../hooks/useHome';
import { HomeLoading } from './HomeLoading';
import { HeroSection } from './HeroSection';
import { FeaturesGrid } from './FeaturesGrid';
import { StatsSection } from './StatsSection';

export function HomeContent() {
  const { content, stats, isLoading, error } = useHome();

  if (isLoading) {
    return <HomeLoading />;
  }

  if (error || !content || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Erro ao carregar a página</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <HeroSection content={content} />
      <StatsSection stats={stats} />
      <FeaturesGrid content={content} />
    </main>
  );
}