'use client';

import { HomeContent } from '../types/home';

interface HeroSectionProps {
  content: HomeContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">
          {content.title}
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Começar Agora
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Saiba Mais
          </button>
        </div>
      </div>
    </section>
  );
}