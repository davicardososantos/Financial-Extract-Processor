'use client';

import { useRouter } from 'next/navigation';
import { ContaInput } from '../types/conta';
import { useContas } from '../hooks/useContas';
import { ContaForm } from '../components/ContaForm';

export function NovaContaPage() {
  const router = useRouter();
  const { criarConta, isLoading, error, limparError } = useContas();

  const handleSalvarConta = async (dadosConta: ContaInput) => {
    try {
      await criarConta(dadosConta);
      router.push('/contas'); // Redireciona para a lista após criar
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleCancelar = () => {
    router.push('/contas');
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
          <h1 className="text-3xl font-bold text-gray-900">Nova Conta</h1>
          <p className="text-gray-600 mt-2">
            Preencha os dados para cadastrar uma nova conta
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
          <ContaForm
            onSubmit={handleSalvarConta}
            onCancel={handleCancelar}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}