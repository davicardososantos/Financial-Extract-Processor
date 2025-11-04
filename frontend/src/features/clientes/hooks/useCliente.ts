import { useState, useEffect } from 'react';
import { Cliente, ClienteUpdate } from '../types/cliente';
import { clienteService } from '../lib/clienteService';

export function useCliente(clienteId?: string) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar cliente por ID
  const buscarCliente = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const clienteData = await clienteService.buscarPorId(id);
      setCliente(clienteData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar cliente');
      setCliente(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar cliente
  const atualizarCliente = async (clienteData: ClienteUpdate): Promise<Cliente> => {
    if (!cliente) {
      throw new Error('Cliente não carregado');
    }

    try {
      setIsLoading(true);
      setError(null);
      const clienteAtualizado = await clienteService.atualizar(cliente.id, clienteData);
      setCliente(clienteAtualizado);
      return clienteAtualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Deletar cliente
  const deletarCliente = async (): Promise<void> => {
    if (!cliente) {
      throw new Error('Cliente não carregado');
    }

    try {
      setIsLoading(true);
      setError(null);
      await clienteService.deletar(cliente.id);
      setCliente(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Limpar dados
  const limparCliente = () => {
    setCliente(null);
    setError(null);
  };

  // Buscar cliente automaticamente quando o ID mudar
  useEffect(() => {
    if (clienteId) {
      buscarCliente(clienteId);
    } else {
      limparCliente();
    }
  }, [clienteId]);

  return {
    cliente,
    isLoading,
    error,
    buscarCliente,
    atualizarCliente,
    deletarCliente,
    limparCliente,
  };
}