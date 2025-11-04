import { useState, useEffect } from 'react';
import { Categoria, CategoriaInput, CategoriaUpdate } from '../types/categoria';
import { categoriaService } from '../lib/categoriaService';

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarCategorias = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const categoriasData = await categoriaService.listar();
      setCategorias(categoriasData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar categorias');
    } finally {
      setIsLoading(false);
    }
  };

  const criarCategoria = async (categoriaData: CategoriaInput): Promise<Categoria> => {
    try {
      setError(null);
      const novaCategoria = await categoriaService.criar(categoriaData);
      setCategorias(prev => [...prev, novaCategoria]);
      return novaCategoria;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const atualizarCategoria = async (id: string, categoriaData: CategoriaUpdate): Promise<Categoria> => {
    try {
      setError(null);
      const categoriaAtualizada = await categoriaService.atualizar(id, categoriaData);
      setCategorias(prev => 
        prev.map(categoria => 
          categoria.id === id ? categoriaAtualizada : categoria
        )
      );
      return categoriaAtualizada;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deletarCategoria = async (id: string): Promise<void> => {
    try {
      setError(null);
      await categoriaService.deletar(id);
      setCategorias(prev => prev.filter(categoria => categoria.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const buscarCategoriaPorId = (id: string): Categoria | undefined => {
    return categorias.find(categoria => categoria.id === id);
  };

  const limparError = () => {
    setError(null);
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  return {
    categorias,
    isLoading,
    error,
    carregarCategorias,
    criarCategoria,
    atualizarCategoria,
    deletarCategoria,
    buscarCategoriaPorId,
    limparError,
  };
}