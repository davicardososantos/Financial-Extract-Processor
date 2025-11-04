'use client';

import { CartaoCredito } from '../types/cartaoCredito';
import { Formatters } from '@/lib';
import { BaseCard } from '@/components/cards/BaseCard';
import { CardHeader } from '@/components/cards/CardHeader';
import { InfoItem } from '@/components/cards/InfoItem';

interface CartaoCreditoCardProps {
  cartao: CartaoCredito;
  onEdit: (cartao: CartaoCredito) => void;
  onDelete: (cartao: CartaoCredito) => void;
}

export function CartaoCreditoCard({ cartao, onEdit, onDelete }: CartaoCreditoCardProps) {
  const porcentagemUtilizada = (cartao.gasto_atual / cartao.limite_total) * 100;
  const isLimiteAlto = porcentagemUtilizada > 80;
  const isLimiteMedio = porcentagemUtilizada > 50;

  const avatar = (
    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
      💳
    </div>
  );

  return (
    <BaseCard>
      <CardHeader
        title={`Cartão ${cartao.ultimos_digitos ? `•••• ${cartao.ultimos_digitos}` : 'de Crédito'}`}
        subtitle={`ID: ${cartao.id.substring(0, 8)}...`}
        avatar={avatar}
        onEdit={() => onEdit(cartao)}
        onDelete={() => onDelete(cartao)}
      />

      <div className="space-y-4">
        {/* Limites */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="text-sm text-gray-600 mb-1">Limite Total</div>
            <div className="text-lg font-bold text-gray-900">
              {Formatters.formatarMoeda(cartao.limite_total)}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3">
            <div className="text-sm text-gray-600 mb-1">Disponível</div>
            <div className="text-lg font-bold text-green-600">
              {Formatters.formatarMoeda(cartao.limite_disponivel)}
            </div>
          </div>
        </div>

        {/* Gasto Atual e Barra de Progresso */}
        <div className="bg-white rounded-lg border border-gray-100 p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">Gasto Atual</div>
            <div className={`text-sm font-medium ${
              isLimiteAlto ? 'text-red-600' : 
              isLimiteMedio ? 'text-yellow-600' : 'text-gray-600'
            }`}>
              {Formatters.formatarMoeda(cartao.gasto_atual)} ({porcentagemUtilizada.toFixed(0)}%)
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isLimiteAlto ? 'bg-red-500' : 
                isLimiteMedio ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(porcentagemUtilizada, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Datas da Fatura */}
        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            icon={
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            content={
              <div>
                <div className="text-xs text-gray-500">Fechamento</div>
                <div className="text-sm font-medium text-gray-900">
                  {Formatters.formatarData(cartao.fechamento_fatura)}
                </div>
              </div>
            }
            className="!p-3"
          />

          <InfoItem
            icon={
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            }
            content={
              <div>
                <div className="text-xs text-gray-500">Vencimento</div>
                <div className="text-sm font-medium text-gray-900">
                  {Formatters.formatarData(cartao.vencimento_fatura)}
                </div>
              </div>
            }
            className="!p-3"
          />
        </div>

        {/* IDs Relacionados */}
        <InfoItem
          icon={
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          }
          content={
            <div className="text-xs text-gray-600">
              Cliente: {cartao.id_cliente.substring(0, 8)}... | Conta: {cartao.id_conta.substring(0, 8)}...
            </div>
          }
        />
      </div>
    </BaseCard>
  );
}