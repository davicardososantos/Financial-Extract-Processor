'use client';

import { Conta } from '../types/conta';
import { ContaCard } from './ContaCard';

interface ContaListProps {
  contas: Conta[];
  isLoading?: boolean;
  onEdit: (conta: Conta) => void;
  onDelete: (conta: Conta) => void;
}

export function ContaList({ contas, isLoading = false, onEdit, onDelete }: ContaListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (contas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Nenhuma conta cadastrada</div>
        <p className="text-gray-400 mt-2">Clique em "Nova Conta" para começar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contas.map((conta) => (
        <ContaCard
          key={conta.id}
          conta={conta}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}