'use client';

import { useRouter } from 'next/navigation';
import { CategoriaInput } from '../types/categoria';
import { useCategorias } from '../hooks/useCategorias';
import { CategoriaForm } from '../components/CategoriaForm';

export function NovaCategoriaPage() {
  const router = useRouter();
  const { criarCategoria, isLoading, error, limparError } = useCategorias();

  const handleSalvarCategoria = async (dadosCategoria: CategoriaInput) => {
    try {
      await criarCategoria(dadosCategoria);
      router.push('/categorias'); // Redireciona para a lista após criar
    } catch (error) {
      // Erro já é tratado no hook
    }
  };

  const handleCancelar = () => {
    router.push('/categorias');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <button
            onClick={handleCancelar}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Voltar para lista
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Nova Categoria</h1>
          <p className="text-gray-600 mt-2">
            Preencha os dados para criar uma nova categoria
          </p>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={limparError}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <CategoriaForm
            onSubmit={handleSalvarCategoria}
            onCancel={handleCancelar}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}