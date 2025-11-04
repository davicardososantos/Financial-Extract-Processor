'use client';

import { useRouter } from 'next/navigation';
import { CartaoCreditoInput } from '../types/cartaoCredito';
import { useCartoesCredito } from '../hooks/useCartoesCredito';
import { CartaoCreditoForm } from '../components/CartaoCreditoForm';

export function NovoCartaoCreditoPage() {
  const router = useRouter();
  const { criarCartao, isLoading, error, limparError } = useCartoesCredito();

  const handleSalvarCartao = async (dadosCartao: CartaoCreditoInput) => {
    try {
      await criarCartao(dadosCartao);
      router.push('/cartoes-credito'); // Redireciona para a lista após criar
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleCancelar = () => {
    router.push('/cartoes-credito');
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Novo Cartão de Crédito</h1>
          <p className="text-gray-600 mt-2">
            Preencha os dados para criar um novo cartão de crédito
          </p>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={limparError}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <CartaoCreditoForm
            onSubmit={handleSalvarCartao}
            onCancel={handleCancelar}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}