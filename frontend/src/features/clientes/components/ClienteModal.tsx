'use client';

import { Cliente, ClienteInput } from '../types/cliente';
import { ClienteForm } from './ClienteForm';

interface ClienteModalProps {
  isOpen: boolean;
  cliente?: Cliente;
  onSubmit: (data: ClienteInput) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export function ClienteModal({ isOpen, cliente, onSubmit, onClose, isLoading }: ClienteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {cliente ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <ClienteForm
            cliente={cliente}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}