'use client';

import { useState, useEffect } from 'react';
import { HomeStats, HomeContent } from '../types/home';
import { homeService } from '../lib/homeService';

export function useHome() {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [contentData, statsData] = await Promise.all([
          homeService.getHomeContent(),
          homeService.getHomeStats()
        ]);

        setContent(contentData);
        setStats(statsData);
      } catch (err) {
        setError('Erro ao carregar dados da página inicial');
        console.error('Home data error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return {
    content,
    stats,
    isLoading,
    error
  };
}