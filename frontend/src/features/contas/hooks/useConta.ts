import { useState, useEffect } from 'react';
import { Conta, ContaUpdate } from '../types/conta';
import { contaService } from '../lib/contaService';

export function useConta(contaId?: string) {
  const [conta, setConta] = useState<Conta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarConta = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const contaData = await contaService.buscarPorId(id);
      setConta(contaData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar conta');
      setConta(null);
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarConta = async (contaData: ContaUpdate): Promise<Conta> => {
    if (!conta) {
      throw new Error('Conta não carregada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const contaAtualizada = await contaService.atualizar(conta.id, contaData);
      setConta(contaAtualizada);
      return contaAtualizada;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar conta';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deletarConta = async (): Promise<void> => {
    if (!conta) {
      throw new Error('Conta não carregada');
    }

    try {
      setIsLoading(true);
      setError(null);
      await contaService.deletar(conta.id);
      setConta(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar conta';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const limparConta = () => {
    setConta(null);
    setError(null);
  };

  useEffect(() => {
    if (contaId) {
      buscarConta(contaId);
    } else {
      limparConta();
    }
  }, [contaId]);

  return {
    conta,
    isLoading,
    error,
    buscarConta,
    atualizarConta,
    deletarConta,
    limparConta,
  };
}