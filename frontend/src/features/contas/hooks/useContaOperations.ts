import { useState } from 'react';
import { Conta, ContaInput, ContaUpdate } from '../types/conta';
import { contaService } from '../lib/contaService';

export function useContaOperations() {
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

  const criar = async (contaData: ContaInput): Promise<Conta> => {
    return operacaoWrapper(
      () => contaService.criar(contaData),
      'Erro ao criar conta'
    );
  };

  const atualizar = async (id: string, contaData: ContaUpdate): Promise<Conta> => {
    return operacaoWrapper(
      () => contaService.atualizar(id, contaData),
      'Erro ao atualizar conta'
    );
  };

  const deletar = async (id: string): Promise<void> => {
    return operacaoWrapper(
      () => contaService.deletar(id),
      'Erro ao deletar conta'
    );
  };

  const buscarPorId = async (id: string): Promise<Conta> => {
    return operacaoWrapper(
      () => contaService.buscarPorId(id),
      'Erro ao buscar conta'
    );
  };

  const buscarPorCliente = async (clienteId: string): Promise<Conta[]> => {
    return operacaoWrapper(
      () => contaService.buscarPorCliente(clienteId),
      'Erro ao buscar contas do cliente'
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
    limparError,
  };
}