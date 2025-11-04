import { useState, useEffect } from 'react';
import { Conta, ContaInput, ContaUpdate } from '../types/conta';
import { contaService } from '../lib/contaService';

export function useContas() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarContas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const contasData = await contaService.listar();
      setContas(contasData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar contas');
    } finally {
      setIsLoading(false);
    }
  };

  const criarConta = async (contaData: ContaInput): Promise<Conta> => {
    try {
      setError(null);
      const novaConta = await contaService.criar(contaData);
      setContas(prev => [...prev, novaConta]);
      return novaConta;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const atualizarConta = async (id: string, contaData: ContaUpdate): Promise<Conta> => {
    try {
      setError(null);
      const contaAtualizada = await contaService.atualizar(id, contaData);
      setContas(prev => 
        prev.map(conta => 
          conta.id === id ? contaAtualizada : conta
        )
      );
      return contaAtualizada;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar conta';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deletarConta = async (id: string): Promise<void> => {
    try {
      setError(null);
      await contaService.deletar(id);
      setContas(prev => prev.filter(conta => conta.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar conta';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const buscarContaPorId = (id: string): Conta | undefined => {
    return contas.find(conta => conta.id === id);
  };

  const buscarContasPorCliente = async (clienteId: string): Promise<Conta[]> => {
    try {
      setError(null);
      const contasCliente = await contaService.buscarPorCliente(clienteId);
      return contasCliente;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar contas do cliente';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const limparError = () => {
    setError(null);
  };

  useEffect(() => {
    carregarContas();
  }, []);

  return {
    contas,
    isLoading,
    error,
    carregarContas,
    criarConta,
    atualizarConta,
    deletarConta,
    buscarContaPorId,
    buscarContasPorCliente,
    limparError,
  };
}