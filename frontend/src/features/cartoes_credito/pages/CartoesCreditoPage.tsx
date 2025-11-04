'use client';

import { useState } from 'react';
import { CartaoCredito } from '../types/cartaoCredito';
import { useCartoesCredito } from '../hooks/useCartoesCredito';
import { CartaoCreditoList } from '../components/CartaoCreditoList';
import { CartaoCreditoModal } from '../components/CartaoCreditoModal';

export function CartoesCreditoPage() {
  const {
    cartoes,
    isLoading,
    error,
    criarCartao,
    atualizarCartao,
    deletarCartao,
    carregarCartoes,
    limparError,
  } = useCartoesCredito();

  const [modalAberto, setModalAberto] = useState(false);
  const [cartaoEditando, setCartaoEditando] = useState<CartaoCredito | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [cartaoParaDeletar, setCartaoParaDeletar] = useState<CartaoCredito | null>(null);

  const handleAbrirModalNovo = () => {
    setCartaoEditando(null);
    setModoEdicao(false);
    setModalAberto(true);
  };

  const handleAbrirModalEdicao = (cartao: CartaoCredito) => {
    setCartaoEditando(cartao);
    setModoEdicao(true);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setCartaoEditando(null);
    setModoEdicao(false);
  };

  const handleSalvarCartao = async (dadosCartao: any) => {
    try {
      if (modoEdicao && cartaoEditando) {
        await atualizarCartao(cartaoEditando.id, dadosCartao);
      } else {
        await criarCartao(dadosCartao);
      }
      handleFecharModal();
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleConfirmarDelecao = async () => {
    if (cartaoParaDeletar) {
      try {
        await deletarCartao(cartaoParaDeletar.id);
        setCartaoParaDeletar(null);
      } catch (error) {
        // Erro já é tratado no hook
      }
    }
  };

  const handleDeletarCartao = (cartao: CartaoCredito) => {
    setCartaoParaDeletar(cartao);
  };

  const handleCancelarDelecao = () => {
    setCartaoParaDeletar(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cartões de Crédito</h1>
              <p className="text-gray-600 mt-2">
                Gerencie os cartões de crédito e acompanhe os limites
              </p>
            </div>
            <button
              onClick={handleAbrirModalNovo}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Novo Cartão
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

        {/* Lista de Cartões de Crédito */}
        <CartaoCreditoList
          cartoes={cartoes || []} 
          isLoading={isLoading}
          onEdit={handleAbrirModalEdicao}
          onDelete={handleDeletarCartao}
        />

        {/* Modal de Confirmação de Deleção */}
        {cartaoParaDeletar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirmar Exclusão
              </h3>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja excluir o cartão{' '}
                <strong>{cartaoParaDeletar.ultimos_digitos ? `•••• ${cartaoParaDeletar.ultimos_digitos}` : 'de Crédito'}</strong>?
                Esta ação não pode ser desfeita.
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
        <CartaoCreditoModal
          isOpen={modalAberto}
          cartao={cartaoEditando || undefined}
          onSubmit={handleSalvarCartao}
          onClose={handleFecharModal}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}