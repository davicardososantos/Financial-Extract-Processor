import { useState } from 'react';
import { ClienteInput } from '../types/cliente';
import { Validators, Formatters } from '@/lib';

export function useClienteForm(initialData?: Partial<ClienteInput>) {
  const [formData, setFormData] = useState<ClienteInput>({
    nome: initialData?.nome || '',
    email: initialData?.email || '',
    cpf: initialData?.cpf || '',
    data_nascimento: initialData?.data_nascimento 
      ? Formatters.formatDateForInput(initialData.data_nascimento)
      : '',
    telefone: initialData?.telefone || null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ClienteInput, string>>>({});

  const updateField = (field: keyof ClienteInput, value: string | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Limpa erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ClienteInput, string>> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!Validators.validarEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!Validators.validarCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.data_nascimento) {
      newErrors.data_nascimento = 'Data de nascimento é obrigatória';
    } else {
      const data = new Date(formData.data_nascimento);
      const ano = data.getFullYear();
      const anoAtual = new Date().getFullYear();
      
      if (isNaN(data.getTime())) {
        newErrors.data_nascimento = 'Data inválida';
      } else if (ano < 1900 || ano > anoAtual) {
        newErrors.data_nascimento = `Ano deve estar entre 1900 e ${anoAtual}`;
      } else if (ano > anoAtual - 18) {
        newErrors.data_nascimento = 'Cliente deve ser maior de 18 anos';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      cpf: '',
      data_nascimento: '',
      telefone: null,
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