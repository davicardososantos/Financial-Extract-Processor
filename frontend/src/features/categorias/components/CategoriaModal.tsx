'use client';

import { Categoria, CategoriaInput } from '../types/categoria';
import { CategoriaForm } from './CategoriaForm';

interface CategoriaModalProps {
  isOpen: boolean;
  categoria?: Categoria;
  onSubmit: (data: CategoriaInput) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export function CategoriaModal({ isOpen, categoria, onSubmit, onClose, isLoading }: CategoriaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {categoria ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <CategoriaForm
            categoria={categoria}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}