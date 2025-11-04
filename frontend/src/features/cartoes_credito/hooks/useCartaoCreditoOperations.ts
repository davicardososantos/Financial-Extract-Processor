import { useState } from 'react';
import { CartaoCredito, CartaoCreditoInput, CartaoCreditoUpdate } from '../types/cartaoCredito';
import { cartaoCreditoService } from '../lib/cartaoCreditoService';

export function useCartaoCreditoOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const operacaoWrapper = async <T>(
    operacao: () => Promise<T>,
    mensagemErro: string
  ): Promise<T> => {
    try {
      setIsLoading(true);
      setError(null);
      return await operacao();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : mensagemErro;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const criar = async (cartaoData: CartaoCreditoInput): Promise<CartaoCredito> => {
    return operacaoWrapper(
      () => cartaoCreditoService.criar(cartaoData),
      'Erro ao criar cartão de crédito'
    );
  };

  const atualizar = async (id: string, cartaoData: CartaoCreditoUpdate): Promise<CartaoCredito> => {
    return operacaoWrapper(
      () => cartaoCreditoService.atualizar(id, cartaoData),
      'Erro ao atualizar cartão de crédito'
    );
  };

  const deletar = async (id: string): Promise<void> => {
    return operacaoWrapper(
      () => cartaoCreditoService.deletar(id),
      'Erro ao deletar cartão de crédito'
    );
  };

  const buscarPorId = async (id: string): Promise<CartaoCredito> => {
    return operacaoWrapper(
      () => cartaoCreditoService.buscarPorId(id),
      'Erro ao buscar cartão de crédito'
    );
  };

  const buscarPorCliente = async (clienteId: string): Promise<CartaoCredito[]> => {
    return operacaoWrapper(
      () => cartaoCreditoService.buscarPorCliente(clienteId),
      'Erro ao buscar cartões do cliente'
    );
  };

  const buscarPorConta = async (contaId: string): Promise<CartaoCredito[]> => {
    return operacaoWrapper(
      () => cartaoCreditoService.buscarPorConta(contaId),
      'Erro ao buscar cartões da conta'
    );
  };

  const atualizarGasto = async (id: string, gastoAtual: number): Promise<{ limite_disponivel: number; gasto_atual: number }> => {
    return operacaoWrapper(
      () => cartaoCreditoService.atualizarGasto(id, { gasto_atual: gastoAtual }),
      'Erro ao atualizar gasto do cartão'
    );
  };

  const limparError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    criar,
    atualizar,
    deletar,
    buscarPorId,
    buscarPorCliente,
    buscarPorConta,
    atualizarGasto,
    limparError,
  };
}