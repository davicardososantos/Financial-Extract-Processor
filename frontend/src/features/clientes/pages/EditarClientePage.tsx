'use client';

import { useRouter, useParams } from 'next/navigation';
import { ClienteUpdate } from '../types/cliente';
import { useCliente } from '../hooks/useCliente';
import { ClienteForm } from '../components/ClienteForm';

export function EditarClientePage() {
  const router = useRouter();
  const params = useParams();
  const clienteId = params.id as string;

  const { cliente, isLoading, error, atualizarCliente, limparCliente } = useCliente(clienteId);

  const handleSalvarCliente = async (dadosCliente: ClienteUpdate) => {
    try {
      await atualizarCliente(dadosCliente);
      router.push('/clientes'); // Redireciona para a lista após atualizar
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleCancelar = () => {
    router.push('/clientes');
  };

  if (isLoading && !cliente) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!cliente && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cliente não encontrado</h1>
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
          <h1 className="text-3xl font-bold text-gray-900">Editar Cliente</h1>
          <p className="text-gray-600 mt-2">
            Atualize os dados do cliente
          </p>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={limparCliente}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {cliente && (
            <ClienteForm
              cliente={cliente}
              onSubmit={handleSalvarCliente}
              onCancel={handleCancelar}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}