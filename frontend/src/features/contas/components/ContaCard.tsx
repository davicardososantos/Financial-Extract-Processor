'use client';

import { useState, useEffect } from 'react'; 
import { Conta } from '../types/conta';
import { Formatters } from '@/lib';
import { clienteService } from '@/features/clientes/lib/clienteService'; 
import { Cliente } from '@/features/clientes/types/cliente'; 
import { BaseCard } from '@/components/cards/BaseCard';
import { CardHeader } from '@/components/cards/CardHeader';
import { InfoItem } from '@/components/cards/InfoItem';

interface ContaCardProps {
  conta: Conta;
  onEdit: (conta: Conta) => void;
  onDelete: (conta: Conta) => void;
}

export function ContaCard({ conta, onEdit, onDelete }: ContaCardProps) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoadingCliente, setIsLoadingCliente] = useState(false);

  useEffect(() => {
    const buscarCliente = async () => {
      try {
        setIsLoadingCliente(true);
        const clienteData = await clienteService.buscarPorId(conta.id_cliente);
        setCliente(clienteData);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        setCliente(null);
      } finally {
        setIsLoadingCliente(false);
      }
    };

    buscarCliente();
  }, [conta.id_cliente]);

  const badges = (
    <span className="text-sm text-gray-500 bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
      {conta.instituicao}
    </span>
  );

  return (
    <BaseCard>
      <CardHeader
        title={conta.nome}
        badges={badges}
        onEdit={() => onEdit(conta)}
        onDelete={() => onDelete(conta)}
      />

      <div className="space-y-3">
        <InfoItem
          icon={
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          content={<span className="text-gray-700">{conta.instituicao}</span>}
        />

        <InfoItem
          icon={
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          content={
            isLoadingCliente ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                <span className="text-gray-500 text-sm">Carregando cliente...</span>
              </div>
            ) : cliente ? (
              <span className="text-gray-700">{cliente.nome}</span>
            ) : (
              <span className="text-gray-500">Cliente não encontrado</span>
            )
          }
        />

        <InfoItem
          icon={
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
          content={<span className="text-gray-700">Criada em {Formatters.formatarData(conta.criado_em)}</span>}
        />
      </div>
    </BaseCard>
  );
}