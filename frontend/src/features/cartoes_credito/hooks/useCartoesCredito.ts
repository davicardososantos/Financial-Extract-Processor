import { useState, useEffect } from 'react';
import { CartaoCredito, CartaoCreditoInput, CartaoCreditoUpdate } from '../types/cartaoCredito';
import { cartaoCreditoService } from '../lib/cartaoCreditoService';

export function useCartoesCredito() {
  const [cartoes, setCartoes] = useState<CartaoCredito[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarCartoes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const cartoesData = await cartaoCreditoService.listar();
      console.log('📊 Dados recebidos do service:', cartoesData); // DEBUG
      setCartoes(cartoesData || []); 
    } catch (err) {
      console.error('❌ Erro ao carregar cartões:', err); // DEBUG
      setError(err instanceof Error ? err.message : 'Erro ao carregar cartões de crédito');
      setCartoes([]); 
    } finally {
      setIsLoading(false);
    }
  };

  const criarCartao = async (cartaoData: CartaoCreditoInput): Promise<CartaoCredito> => {
    try {
      setError(null);
      const novoCartao = await cartaoCreditoService.criar(cartaoData);
      setCartoes(prev => [...(prev || []), novoCartao]); 
      return novoCartao;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar cartão de crédito';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const atualizarCartao = async (id: string, cartaoData: CartaoCreditoUpdate): Promise<CartaoCredito> => {
    try {
      setError(null);
      const cartaoAtualizado = await cartaoCreditoService.atualizar(id, cartaoData);
      setCartoes(prev => 
        (prev || []).map(cartao =>  
          cartao.id === id ? cartaoAtualizado : cartao
        )
      );
      return cartaoAtualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar cartão de crédito';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deletarCartao = async (id: string): Promise<void> => {
    try {
      setError(null);
      await cartaoCreditoService.deletar(id);
      setCartoes(prev => (prev || []).filter(cartao => cartao.id !== id)); 
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar cartão de crédito';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const buscarCartaoPorId = (id: string): CartaoCredito | undefined => {
    return (cartoes || []).find(cartao => cartao.id === id); 
  };

  const buscarPorCliente = async (clienteId: string): Promise<CartaoCredito[]> => {
    try {
      setError(null);
      return await cartaoCreditoService.buscarPorCliente(clienteId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar cartões do cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const buscarPorConta = async (contaId: string): Promise<CartaoCredito[]> => {
    try {
      setError(null);
      return await cartaoCreditoService.buscarPorConta(contaId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar cartões da conta';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const atualizarGasto = async (id: string, gastoAtual: number): Promise<{ limite_disponivel: number; gasto_atual: number }> => {
    try {
      setError(null);
      const resultado = await cartaoCreditoService.atualizarGasto(id, { gasto_atual: gastoAtual });
      
      // Atualiza o cartão na lista local
      setCartoes(prev => 
        prev.map(cartao => 
          cartao.id === id 
            ? { 
                ...cartao, 
                gasto_atual: resultado.gasto_atual, 
                limite_disponivel: resultado.limite_disponivel,
                alterado_em: new Date().toISOString()
              } 
            : cartao
        )
      );
      
      return resultado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar gasto do cartão';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const limparError = () => {
    setError(null);
  };

  useEffect(() => {
    carregarCartoes();
  }, []);

  return {
    cartoes: cartoes || [],
    isLoading,
    error,
    carregarCartoes,
    criarCartao,
    atualizarCartao,
    deletarCartao,
    buscarCartaoPorId,
    buscarPorCliente,
    buscarPorConta,
    atualizarGasto,
    limparError,
  };
}