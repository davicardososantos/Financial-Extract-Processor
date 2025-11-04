'use client';

import { useState } from 'react';
import { Conta, ContaInput } from '../types/conta';
import { useContaForm } from '../hooks/useContaForm';
import { BaseForm } from '@/components/forms/BaseForm';
import { FormInput } from '@/components/forms/FormInput';
import { FormSelect } from '@/components/forms/FormSelect';
import { FormGrid } from '@/components/forms/FormGrid';

interface ContaFormProps {
  conta?: Conta;
  onSubmit: (data: ContaInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ContaForm({ conta, onSubmit, onCancel, isLoading = false }: ContaFormProps) {
  const { 
    formData, 
    errors, 
    clientes, 
    isLoadingClientes, 
    updateField, 
    validateForm 
  } = useContaForm(
    conta ? {
      nome: conta.nome,
      instituicao: conta.instituicao,
      id_cliente: conta.id_cliente,
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
      setSubmitError(error instanceof Error ? error.message : 'Erro ao salvar conta');
    }
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading || isLoadingClientes}
      submitError={submitError}
      isEdit={!!conta}
    >
      <FormGrid>
        <FormInput
          label="Nome da Conta"
          value={formData.nome}
          onChange={(value) => updateField('nome', value)}
          error={errors.nome}
          required
          placeholder="Ex: Conta Corrente, Poupança, etc."
          className="md:col-span-2"
        />

        <FormInput
          label="Instituição Financeira"
          value={formData.instituicao}
          onChange={(value) => updateField('instituicao', value)}
          error={errors.instituicao}
          required
          placeholder="Ex: Banco do Brasil, Itaú, Nubank, etc."
          className="md:col-span-2"
        />

        <FormSelect
          label="Cliente"
          value={formData.id_cliente}
          onChange={(value) => updateField('id_cliente', value)}
          options={clientes.map(cliente => ({
            value: cliente.id,
            label: cliente.nome
          }))}
          error={errors.id_cliente}
          required
          isLoading={isLoadingClientes}
          className="md:col-span-2"
        />
      </FormGrid>
    </BaseForm>
  );
}