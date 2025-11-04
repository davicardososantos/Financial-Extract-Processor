import { useState, useEffect } from 'react';
import { CartaoCredito, CartaoCreditoUpdate } from '../types/cartaoCredito';
import { cartaoCreditoService } from '../lib/cartaoCreditoService';

export function useCartaoCredito(cartaoId?: string) {
  const [cartao, setCartao] = useState<CartaoCredito | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarCartao = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const cartaoData = await cartaoCreditoService.buscarPorId(id);
      setCartao(cartaoData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar cartão de crédito');
      setCartao(null);
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarCartao = async (cartaoData: CartaoCreditoUpdate): Promise<CartaoCredito> => {
    if (!cartao) {
      throw new Error('Cartão de crédito não carregado');
    }

    try {
      setIsLoading(true);
      setError(null);
      const cartaoAtualizado = await cartaoCreditoService.atualizar(cartao.id, cartaoData);
      setCartao(cartaoAtualizado);
      return cartaoAtualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar cartão de crédito';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deletarCartao = async (): Promise<void> => {
    if (!cartao) {
      throw new Error('Cartão de crédito não carregado');
    }

    try {
      setIsLoading(true);
      setError(null);
      await cartaoCreditoService.deletar(cartao.id);
      setCartao(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar cartão de crédito';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarGasto = async (gastoAtual: number): Promise<{ limite_disponivel: number; gasto_atual: number }> => {
    if (!cartao) {
      throw new Error('Cartão de crédito não carregado');
    }

    try {
      setIsLoading(true);
      setError(null);
      const resultado = await cartaoCreditoService.atualizarGasto(cartao.id, { gasto_atual: gastoAtual });
      
      // Atualiza o cartão localmente
      setCartao(prev => 
        prev ? { 
          ...prev, 
          gasto_atual: resultado.gasto_atual, 
          limite_disponivel: resultado.limite_disponivel,
          alterado_em: new Date().toISOString()
        } : null
      );
      
      return resultado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar gasto do cartão';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const limparCartao = () => {
    setCartao(null);
    setError(null);
  };

  useEffect(() => {
    if (cartaoId) {
      buscarCartao(cartaoId);
    } else {
      limparCartao();
    }
  }, [cartaoId]);

  return {
    cartao,
    isLoading,
    error,
    buscarCartao,
    atualizarCartao,
    deletarCartao,
    atualizarGasto,
    limparCartao,
  };
}