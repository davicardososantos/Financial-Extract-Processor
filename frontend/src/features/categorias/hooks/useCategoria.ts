import { useState, useEffect } from 'react';
import { Categoria, CategoriaUpdate } from '../types/categoria';
import { categoriaService } from '../lib/categoriaService';

export function useCategoria(categoriaId?: string) {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarCategoria = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const categoriaData = await categoriaService.buscarPorId(id);
      setCategoria(categoriaData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar categoria');
      setCategoria(null);
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarCategoria = async (categoriaData: CategoriaUpdate): Promise<Categoria> => {
    if (!categoria) {
      throw new Error('Categoria não carregada');
    }

    try {
      setIsLoading(true);
      setError(null);
      const categoriaAtualizada = await categoriaService.atualizar(categoria.id, categoriaData);
      setCategoria(categoriaAtualizada);
      return categoriaAtualizada;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deletarCategoria = async (): Promise<void> => {
    if (!categoria) {
      throw new Error('Categoria não carregada');
    }

    try {
      setIsLoading(true);
      setError(null);
      await categoriaService.deletar(categoria.id);
      setCategoria(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const limparCategoria = () => {
    setCategoria(null);
    setError(null);
  };

  useEffect(() => {
    if (categoriaId) {
      buscarCategoria(categoriaId);
    } else {
      limparCategoria();
    }
  }, [categoriaId]);

  return {
    categoria,
    isLoading,
    error,
    buscarCategoria,
    atualizarCategoria,
    deletarCategoria,
    limparCategoria,
  };
}