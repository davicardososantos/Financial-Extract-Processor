'use client';

import { Categoria } from '../types/categoria';
import { CategoriaCard } from './CategoriaCard';

interface CategoriaListProps {
  categorias: Categoria[];
  isLoading?: boolean;
  onEdit: (categoria: Categoria) => void;
  onDelete: (categoria: Categoria) => void;
}

export function CategoriaList({ categorias, isLoading = false, onEdit, onDelete }: CategoriaListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (categorias.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Nenhuma categoria cadastrada</div>
        <p className="text-gray-400 mt-2">Clique em "Nova Categoria" para começar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categorias.map((categoria) => (
        <CategoriaCard
          key={categoria.id}
          categoria={categoria}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}