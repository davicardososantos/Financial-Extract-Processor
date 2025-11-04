'use client';

import { Categoria } from '../types/categoria';
import { Formatters } from '@/lib';
import { BaseCard } from '@/components/cards/BaseCard';
import { CardHeader } from '@/components/cards/CardHeader';
import { InfoItem } from '@/components/cards/InfoItem';

interface CategoriaCardProps {
  categoria: Categoria;
  onEdit: (categoria: Categoria) => void;
  onDelete: (categoria: Categoria) => void;
}

export function CategoriaCard({ categoria, onEdit, onDelete }: CategoriaCardProps) {
  const avatar = (
    <div 
      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
      style={{ backgroundColor: categoria.cor }}
    >
      {categoria.icone}
    </div>
  );

  const badges = (
    <span 
      className="text-xs text-white px-2 py-1 rounded-full font-medium"
      style={{ backgroundColor: categoria.cor }}
    >
      {categoria.cor.toUpperCase()}
    </span>
  );

  return (
    <BaseCard>
      <CardHeader
        title={categoria.nome}
        avatar={avatar}
        badges={badges}
        onEdit={() => onEdit(categoria)}
        onDelete={() => onDelete(categoria)}
      />

      <div className="space-y-3">
        {categoria.descricao && (
          <InfoItem
            icon={
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            content={<span className="text-gray-700 text-sm">{categoria.descricao}</span>}
          />
        )}

        <InfoItem
          icon={
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          content={<span className="text-gray-700">Criada em {Formatters.formatarData(categoria.criado_em)}</span>}
        />
      </div>
    </BaseCard>
  );
}