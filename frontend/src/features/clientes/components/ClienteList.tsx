'use client';

import { Cliente } from '../types/cliente';
import { ClienteCard } from './ClienteCard';

interface ClienteListProps {
  clientes: Cliente[];
  isLoading?: boolean;
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
}

export function ClienteList({ clientes, isLoading = false, onEdit, onDelete }: ClienteListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Nenhum cliente cadastrado</div>
        <p className="text-gray-400 mt-2">Clique em "Novo Cliente" para começar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clientes.map((cliente) => (
        <ClienteCard
          key={cliente.id}
          cliente={cliente}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}