'use client';

import { useRouter, useParams } from 'next/navigation';
import { CartaoCreditoUpdate } from '../types/cartaoCredito';
import { useCartaoCredito } from '../hooks/useCartaoCredito';
import { CartaoCreditoForm } from '../components/CartaoCreditoForm';

export function EditarCartaoCreditoPage() {
  const router = useRouter();
  const params = useParams();
  const cartaoId = params.id as string;

  const { cartao, isLoading, error, atualizarCartao, limparCartao } = useCartaoCredito(cartaoId);

  const handleSalvarCartao = async (dadosCartao: CartaoCreditoUpdate) => {
    try {
      await atualizarCartao(dadosCartao);
      router.push('/cartoes-credito'); // Redireciona para a lista após atualizar
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleCancelar = () => {
    router.push('/cartoes-credito');
  };

  if (isLoading && !cartao) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!cartao && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cartão de crédito não encontrado</h1>
          <button
            onClick={handleCancelar}
            className="text-blue-600 hover:text-blue-800"
          >
            Voltar para lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <button
            onClick={handleCancelar}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Voltar para lista
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Editar Cartão de Crédito</h1>
          <p className="text-gray-600 mt-2">
            Atualize os dados do cartão de crédito
          </p>
          {cartao?.ultimos_digitos && (
            <p className="text-gray-500 text-sm mt-1">
              Cartão: •••• {cartao.ultimos_digitos}
            </p>
          )}
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={limparCartao}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartao && (
            <CartaoCreditoForm
              cartao={cartao}
              onSubmit={handleSalvarCartao}
              onCancel={handleCancelar}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}