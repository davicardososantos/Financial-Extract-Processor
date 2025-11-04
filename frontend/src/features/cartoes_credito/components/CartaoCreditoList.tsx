'use client';

import { CartaoCredito } from '../types/cartaoCredito';
import { CartaoCreditoCard } from './CartaoCreditoCard';

interface CartaoCreditoListProps {
  cartoes?: CartaoCredito[]; // Tornar opcional
  isLoading?: boolean;
  onEdit: (cartao: CartaoCredito) => void;
  onDelete: (cartao: CartaoCredito) => void;
}

export function CartaoCreditoList({ cartoes = [], isLoading = false, onEdit, onDelete }: CartaoCreditoListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Verificar se cartoes é undefined ou array vazio
  if (!cartoes || cartoes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Nenhum cartão de crédito cadastrado</div>
        <p className="text-gray-400 mt-2">Clique em "Novo Cartão" para começar</p>
      </div>
    );
  }

  // Calcular totais para exibição
  const totalLimite = cartoes.reduce((sum, cartao) => sum + cartao.limite_total, 0);
  const totalDisponivel = cartoes.reduce((sum, cartao) => sum + cartao.limite_disponivel, 0);
  const totalGasto = cartoes.reduce((sum, cartao) => sum + cartao.gasto_atual, 0);

  return (
    <div className="space-y-6">
      {/* Resumo dos Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Total de Limite</div>
          <div className="text-xl font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalLimite)}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Total Disponível</div>
          <div className="text-xl font-bold text-green-600">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDisponivel)}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Total Gasto</div>
          <div className="text-xl font-bold text-orange-600">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGasto)}
          </div>
        </div>
      </div>

      {/* Lista de Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartoes.map((cartao) => (
          <CartaoCreditoCard
            key={cartao.id}
            cartao={cartao}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}