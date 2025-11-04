'use client';

import { useRouter } from 'next/navigation';
import { ClienteInput } from '../types/cliente';
import { useClientes } from '../hooks/useClientes';
import { ClienteForm } from '../components/ClienteForm';

export function NovoClientePage() {
  const router = useRouter();
  const { criarCliente, isLoading, error, limparError } = useClientes();

  const handleSalvarCliente = async (dadosCliente: ClienteInput) => {
    try {
      await criarCliente(dadosCliente);
      router.push('/clientes'); // Redireciona para a lista após criar
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleCancelar = () => {
    router.push('/clientes');
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
          <h1 className="text-3xl font-bold text-gray-900">Novo Cliente</h1>
          <p className="text-gray-600 mt-2">
            Preencha os dados para cadastrar um novo cliente
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
          <ClienteForm
            onSubmit={handleSalvarCliente}
            onCancel={handleCancelar}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}