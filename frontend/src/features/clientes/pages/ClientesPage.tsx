'use client';

import { useState } from 'react';
import { Cliente } from '../types/cliente';
import { useClientes } from '../hooks/useClientes';
import { ClienteList } from '../components/ClienteList';
import { ClienteModal } from '../components/ClienteModal';
import { ClienteForm } from '../components/ClienteForm';

export function ClientesPage() {
  const {
    clientes,
    isLoading,
    error,
    criarCliente,
    atualizarCliente,
    deletarCliente,
    carregarClientes,
    limparError,
  } = useClientes();

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteParaDeletar, setClienteParaDeletar] = useState<Cliente | null>(null);

  const handleAbrirModalNovo = () => {
    setClienteEditando(null);
    setModoEdicao(false);
    setModalAberto(true);
  };

  const handleAbrirModalEdicao = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setModoEdicao(true);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setClienteEditando(null);
    setModoEdicao(false);
  };

  const handleSalvarCliente = async (dadosCliente: any) => {
    try {
      if (modoEdicao && clienteEditando) {
        await atualizarCliente(clienteEditando.id, dadosCliente);
      } else {
        await criarCliente(dadosCliente);
      }
      handleFecharModal();
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleConfirmarDelecao = async () => {
    if (clienteParaDeletar) {
      try {
        await deletarCliente(clienteParaDeletar.id);
        setClienteParaDeletar(null);
      } catch (error) {
        // Erro já é tratado no hook
      }
    }
  };

  const handleDeletarCliente = (cliente: Cliente) => {
    setClienteParaDeletar(cliente);
  };

  const handleCancelarDelecao = () => {
    setClienteParaDeletar(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
              <p className="text-gray-600 mt-2">
                Gerencie os clientes do sistema
              </p>
            </div>
            <button
              onClick={handleAbrirModalNovo}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Novo Cliente
            </button>
          </div>
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

        {/* Lista de Clientes */}
        <ClienteList
          clientes={clientes}
          isLoading={isLoading}
          onEdit={handleAbrirModalEdicao}
          onDelete={handleDeletarCliente}
        />

        {/* Modal de Confirmação de Deleção */}
        {clienteParaDeletar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirmar Exclusão
              </h3>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja excluir o cliente{' '}
                <strong>{clienteParaDeletar.nome}</strong>? Esta ação não pode ser desfeita.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelarDelecao}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmarDelecao}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Formulário */}
        <ClienteModal
          isOpen={modalAberto}
          cliente={clienteEditando || undefined}
          onSubmit={handleSalvarCliente}
          onClose={handleFecharModal}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}