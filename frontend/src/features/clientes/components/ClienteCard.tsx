'use client';

import { Cliente } from '../types/cliente';
import { Formatters } from '@/lib';
import { BaseCard } from '@/components/cards/BaseCard';
import { CardHeader } from '@/components/cards/CardHeader';
import { InfoItem } from '@/components/cards/InfoItem';

interface ClienteCardProps {
  cliente: Cliente;
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
}

export function ClienteCard({ cliente, onEdit, onDelete }: ClienteCardProps) {
  const idade = Formatters.calcularIdade(cliente.data_nascimento);

  const badges = (
    <>
      <span className="text-sm text-gray-500 bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
        {idade} anos
      </span>
      <span className="text-sm text-gray-500 bg-green-50 text-green-700 px-2 py-1 rounded-full">
        {Formatters.formatarCPF(cliente.cpf)}
      </span>
    </>
  );

  return (
    <BaseCard>
      <CardHeader
        title={cliente.nome}
        badges={badges}
        onEdit={() => onEdit(cliente)}
        onDelete={() => onDelete(cliente)}
      />

      <div className="space-y-3">
        <InfoItem
          icon={
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          content={<span className="text-gray-700">{cliente.email}</span>}
        />

        <InfoItem
          icon={
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
          content={<span className="text-gray-700">{Formatters.formatarTelefone(cliente.telefone)}</span>}
        />

        <InfoItem
          icon={
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          content={<span className="text-gray-700">Cadastrado em {Formatters.formatarData(cliente.criado_em)}</span>}
        />
      </div>
    </BaseCard>
  );
}