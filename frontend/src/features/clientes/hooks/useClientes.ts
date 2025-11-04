import { useState, useEffect } from 'react';
import { Cliente, ClienteInput, ClienteUpdate } from '../types/cliente';
import { clienteService } from '../lib/clienteService';

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar clientes
  const carregarClientes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const clientesData = await clienteService.listar();
      setClientes(clientesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar clientes');
    } finally {
      setIsLoading(false);
    }
  };

  // Criar cliente
  const criarCliente = async (clienteData: ClienteInput): Promise<Cliente> => {
    try {
      setError(null);
      const novoCliente = await clienteService.criar(clienteData);
      setClientes(prev => [...prev, novoCliente]);
      return novoCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Atualizar cliente
  const atualizarCliente = async (id: string, clienteData: ClienteUpdate): Promise<Cliente> => {
    try {
      setError(null);
      const clienteAtualizado = await clienteService.atualizar(id, clienteData);
      setClientes(prev => 
        prev.map(cliente => 
          cliente.id === id ? clienteAtualizado : cliente
        )
      );
      return clienteAtualizado;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Deletar cliente
  const deletarCliente = async (id: string): Promise<void> => {
    try {
      setError(null);
      await clienteService.deletar(id);
      setClientes(prev => prev.filter(cliente => cliente.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Buscar cliente por ID (da lista local)
  const buscarClientePorId = (id: string): Cliente | undefined => {
    return clientes.find(cliente => cliente.id === id);
  };

  // Limpar erro
  const limparError = () => {
    setError(null);
  };

  // Carregar clientes ao montar o hook
  useEffect(() => {
    carregarClientes();
  }, []);

  return {
    clientes,
    isLoading,
    error,
    carregarClientes,
    criarCliente,
    atualizarCliente,
    deletarCliente,
    buscarClientePorId,
    limparError,
  };
}