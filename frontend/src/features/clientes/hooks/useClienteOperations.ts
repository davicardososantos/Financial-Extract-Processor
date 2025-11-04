import { useState } from 'react';
import { Cliente, ClienteInput, ClienteUpdate } from '../types/cliente';
import { clienteService } from '../lib/clienteService';

export function useClienteOperations() {
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

  const criar = async (clienteData: ClienteInput): Promise<Cliente> => {
    return operacaoWrapper(
      () => clienteService.criar(clienteData),
      'Erro ao criar cliente'
    );
  };

  const atualizar = async (id: string, clienteData: ClienteUpdate): Promise<Cliente> => {
    return operacaoWrapper(
      () => clienteService.atualizar(id, clienteData),
      'Erro ao atualizar cliente'
    );
  };

  const deletar = async (id: string): Promise<void> => {
    return operacaoWrapper(
      () => clienteService.deletar(id),
      'Erro ao deletar cliente'
    );
  };

  const buscarPorId = async (id: string): Promise<Cliente> => {
    return operacaoWrapper(
      () => clienteService.buscarPorId(id),
      'Erro ao buscar cliente'
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
    limparError,
  };
}