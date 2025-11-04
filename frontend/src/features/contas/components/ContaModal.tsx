'use client';

import { Conta, ContaInput } from '../types/conta';
import { ContaForm } from './ContaForm';

interface ContaModalProps {
  isOpen: boolean;
  conta?: Conta;
  onSubmit: (data: ContaInput) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export function ContaModal({ isOpen, conta, onSubmit, onClose, isLoading }: ContaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {conta ? 'Editar Conta' : 'Nova Conta'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <ContaForm
            conta={conta}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}