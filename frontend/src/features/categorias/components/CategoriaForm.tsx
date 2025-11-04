'use client';

import { useState } from 'react';
import { Categoria, CategoriaInput } from '../types/categoria';
import { useCategoriaForm } from '../hooks/useCategoriaForm';
import { BaseForm } from '@/components/forms/BaseForm';
import { FormInput } from '@/components/forms/FormInput';
import { FormGrid } from '@/components/forms/FormGrid';

interface CategoriaFormProps {
  categoria?: Categoria;
  onSubmit: (data: CategoriaInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ICONES_SUGERIDOS = ['🍕', '🚗', '🏠', '🏥', '📚', '🎮', '👕', '🔧', '📈', '💰'];

export function CategoriaForm({ categoria, onSubmit, onCancel, isLoading = false }: CategoriaFormProps) {
  const { formData, errors, updateField, validateForm } = useCategoriaForm(
    categoria ? {
      nome: categoria.nome,
      descricao: categoria.descricao,
      cor: categoria.cor,
      icone: categoria.icone,
    } : undefined
  );

  const [submitError, setSubmitError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Erro ao salvar categoria');
    }
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      submitError={submitError}
      isEdit={!!categoria}
    >
      <FormGrid>
        <FormInput
          label="Nome da Categoria"
          value={formData.nome}
          onChange={(value) => updateField('nome', value)}
          error={errors.nome}
          required
          className="md:col-span-2"
        />

        <FormInput
          label="Descrição"
          value={formData.descricao || ''}
          onChange={(value) => updateField('descricao', value || null)}
          placeholder="Descrição opcional..."
          className="md:col-span-2"
        />

        <FormInput
          label="Cor"
          type="color"
          value={formData.cor}
          onChange={(value) => updateField('cor', value)}
          error={errors.cor}
          required
        />

        <FormInput
          label="Ícone"
          value={formData.icone}
          onChange={(value) => updateField('icone', value)}
          error={errors.icone}
          required
        />

        {/* Ícones sugeridos mantido específico */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ícones Sugeridos</label>
          <div className="grid grid-cols-5 gap-2">
            {ICONES_SUGERIDOS.map((icone) => (
              <button
                key={icone}
                type="button"
                onClick={() => updateField('icone', icone)}
                className={`p-2 text-xl rounded-lg border hover:bg-gray-50 transition-colors ${
                  formData.icone === icone ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                {icone}
              </button>
            ))}
          </div>
        </div>
      </FormGrid>
    </BaseForm>
  );
}