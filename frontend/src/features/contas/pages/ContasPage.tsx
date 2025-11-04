'use client';

import { useState } from 'react';
import { Conta } from '../types/conta';
import { useContas } from '../hooks/useContas';
import { ContaList } from '../components/ContaList';
import { ContaModal } from '../components/ContaModal';

export function ContasPage() {
  const {
    contas,
    isLoading,
    error,
    criarConta,
    atualizarConta,
    deletarConta,
    carregarContas,
    limparError,
  } = useContas();

  const [modalAberto, setModalAberto] = useState(false);
  const [contaEditando, setContaEditando] = useState<Conta | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [contaParaDeletar, setContaParaDeletar] = useState<Conta | null>(null);

  const handleAbrirModalNovo = () => {
    setContaEditando(null);
    setModoEdicao(false);
    setModalAberto(true);
  };

  const handleAbrirModalEdicao = (conta: Conta) => {
    setContaEditando(conta);
    setModoEdicao(true);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setContaEditando(null);
    setModoEdicao(false);
  };

  const handleSalvarConta = async (dadosConta: any) => {
    try {
      if (modoEdicao && contaEditando) {
        await atualizarConta(contaEditando.id, dadosConta);
      } else {
        await criarConta(dadosConta);
      }
      handleFecharModal();
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleConfirmarDelecao = async () => {
    if (contaParaDeletar) {
      try {
        await deletarConta(contaParaDeletar.id);
        setContaParaDeletar(null);
      } catch (error) {
        // Erro já é tratado no hook
      }
    }
  };

  const handleDeletarConta = (conta: Conta) => {
    setContaParaDeletar(conta);
  };

  const handleCancelarDelecao = () => {
    setContaParaDeletar(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contas</h1>
              <p className="text-gray-600 mt-2">
                Gerencie as contas bancárias do sistema
              </p>
            </div>
            <button
              onClick={handleAbrirModalNovo}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Nova Conta
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

        {/* Lista de Contas */}
        <ContaList
          contas={contas}
          isLoading={isLoading}
          onEdit={handleAbrirModalEdicao}
          onDelete={handleDeletarConta}
        />

        {/* Modal de Confirmação de Deleção */}
        {contaParaDeletar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirmar Exclusão
              </h3>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja excluir a conta{' '}
                <strong>{contaParaDeletar.nome}</strong>? Esta ação não pode ser desfeita.
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
        <ContaModal
          isOpen={modalAberto}
          conta={contaEditando || undefined}
          onSubmit={handleSalvarConta}
          onClose={handleFecharModal}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}