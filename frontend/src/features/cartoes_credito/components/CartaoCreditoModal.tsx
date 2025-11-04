'use client';

import { CartaoCredito, CartaoCreditoInput } from '../types/cartaoCredito';
import { CartaoCreditoForm } from './CartaoCreditoForm';

interface CartaoCreditoModalProps {
  isOpen: boolean;
  cartao?: CartaoCredito;
  onSubmit: (data: CartaoCreditoInput) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

export function CartaoCreditoModal({ isOpen, cartao, onSubmit, onClose, isLoading }: CartaoCreditoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {cartao ? 'Editar Cartão de Crédito' : 'Novo Cartão de Crédito'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <CartaoCreditoForm
            cartao={cartao}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}