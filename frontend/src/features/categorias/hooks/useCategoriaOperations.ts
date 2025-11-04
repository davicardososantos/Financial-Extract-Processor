import { useState } from 'react';
import { Categoria, CategoriaInput, CategoriaUpdate } from '../types/categoria';
import { categoriaService } from '../lib/categoriaService';

export function useCategoriaOperations() {
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

  const criar = async (categoriaData: CategoriaInput): Promise<Categoria> => {
    return operacaoWrapper(
      () => categoriaService.criar(categoriaData),
      'Erro ao criar categoria'
    );
  };

  const atualizar = async (id: string, categoriaData: CategoriaUpdate): Promise<Categoria> => {
    return operacaoWrapper(
      () => categoriaService.atualizar(id, categoriaData),
      'Erro ao atualizar categoria'
    );
  };

  const deletar = async (id: string): Promise<void> => {
    return operacaoWrapper(
      () => categoriaService.deletar(id),
      'Erro ao deletar categoria'
    );
  };

  const buscarPorId = async (id: string): Promise<Categoria> => {
    return operacaoWrapper(
      () => categoriaService.buscarPorId(id),
      'Erro ao buscar categoria'
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