'use client';

import { HomeStats } from '../types/home';

interface StatsSectionProps {
  stats: HomeStats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatNumber(stats.totalUsers)}+
            </div>
            <div className="text-gray-600">Usuários Ativos</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {formatNumber(stats.processedFiles)}+
            </div>
            <div className="text-gray-600">Extratos Processados</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {formatNumber(stats.totalTransactions)}+
            </div>
            <div className="text-gray-600">Transações Analisadas</div>
          </div>
        </div>
      </div>
    </section>
  );
}