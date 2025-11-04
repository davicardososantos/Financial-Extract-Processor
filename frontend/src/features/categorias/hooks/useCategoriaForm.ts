import { useState } from 'react';
import { CategoriaInput } from '../types/categoria';

export function useCategoriaForm(initialData?: Partial<CategoriaInput>) {
  const [formData, setFormData] = useState<CategoriaInput>({
    nome: initialData?.nome || '',
    descricao: initialData?.descricao || null,
    cor: initialData?.cor || '#3B82F6', // Azul padrão
    icone: initialData?.icone || '📁',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CategoriaInput, string>>>({});

  const updateField = (field: keyof CategoriaInput, value: string | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CategoriaInput, string>> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.cor.trim()) {
      newErrors.cor = 'Cor é obrigatória';
    } else if (!/^#[0-9A-F]{6}$/i.test(formData.cor)) {
      newErrors.cor = 'Cor deve estar no formato hexadecimal (#FFFFFF)';
    }

    if (!formData.icone.trim()) {
      newErrors.icone = 'Ícone é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: null,
      cor: '#3B82F6',
      icone: '📁',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    resetForm,
  };
}