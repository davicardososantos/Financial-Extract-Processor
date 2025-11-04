'use client';

import { useState } from 'react';
import { Cliente, ClienteInput } from '../types/cliente';
import { useClienteForm } from '../hooks/useClienteForm';
import { BaseForm } from '@/components/forms/BaseForm';
import { FormInput } from '@/components/forms/FormInput';
import { FormGrid } from '@/components/forms/FormGrid';
import { FormattedInput } from '@/components/forms/FormattedInput';

interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (data: ClienteInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ClienteForm({ cliente, onSubmit, onCancel, isLoading = false }: ClienteFormProps) {
  const { formData, errors, updateField, validateForm } = useClienteForm(
    cliente ? {
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      data_nascimento: cliente.data_nascimento,
      telefone: cliente.telefone,
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
      setSubmitError(error instanceof Error ? error.message : 'Erro ao salvar cliente');
    }
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      submitError={submitError}
      isEdit={!!cliente}
    >
      <FormGrid>
        <FormInput
          label="Nome Completo"
          value={formData.nome}
          onChange={(value) => updateField('nome', value)}
          error={errors.nome}
          required
          placeholder="Digite o nome completo"
        />

        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          error={errors.email}
          required
          placeholder="exemplo@email.com"
        />

        <FormattedInput
          label="CPF"
          value={formData.cpf}
          onChange={(value) => updateField('cpf', value)}
          error={errors.cpf}
          type="cpf"
          required
        />

        <FormInput
          label="Data de Nascimento"
          type="date"
          value={formData.data_nascimento}
          onChange={(value) => updateField('data_nascimento', value)}
          error={errors.data_nascimento}
          required
        />

        <FormattedInput
          label="Telefone"
          value={formData.telefone || ''}
          onChange={(value) => updateField('telefone', value || null)}
          type="telefone"
          className="md:col-span-2"
        />
      </FormGrid>
    </BaseForm>
  );
}