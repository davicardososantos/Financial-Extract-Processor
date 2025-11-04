'use client';

import { useState } from 'react';
import { CartaoCredito, CartaoCreditoInput } from '../types/cartaoCredito';
import { useCartaoCreditoForm } from '../hooks/useCartaoCreditoForm';
import { BaseForm } from '@/components/forms/BaseForm';
import { CurrencyInput } from '@/components/forms/CurrencyInput';
import { FormInput } from '@/components/forms/FormInput';
import { FormSelect } from '@/components/forms/FormSelect';
import { FormGrid } from '@/components/forms/FormGrid';

interface CartaoCreditoFormProps {
  cartao?: CartaoCredito;
  onSubmit: (data: CartaoCreditoInput) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CartaoCreditoForm({ cartao, onSubmit, onCancel, isLoading = false }: CartaoCreditoFormProps) {
  const { formData, errors, clientes, contas, isLoadingClientes, isLoadingContas, updateField, validateForm } = useCartaoCreditoForm(
    cartao ? {
      limite_total: cartao.limite_total,
      limite_disponivel: cartao.limite_disponivel,
      gasto_atual: cartao.gasto_atual,
      fechamento_fatura: cartao.fechamento_fatura,
      vencimento_fatura: cartao.vencimento_fatura,
      ultimos_digitos: cartao.ultimos_digitos,
      id_conta: cartao.id_conta,
      id_cliente: cartao.id_cliente,
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
      setSubmitError(error instanceof Error ? error.message : 'Erro ao salvar cartão de crédito');
    }
  };

  // Opções para os selects de dias
  const diasOptions = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Dia ${i + 1}`
  }));

  return (
    <BaseForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading || isLoadingClientes || isLoadingContas}
      submitError={submitError}
      isEdit={!!cartao}
    >
      <FormGrid>
        <CurrencyInput
          label="Limite Total"
          value={formData.limite_total}
          onChange={(value) => updateField('limite_total', value)}
          error={errors.limite_total}
          required
        />

        <CurrencyInput
          label="Gasto Atual"
          value={formData.gasto_atual}
          onChange={(value) => updateField('gasto_atual', value)}
          error={errors.gasto_atual}
          required
        />

        {/* Limite Disponível (readonly) */}
        <FormInput
          label="Limite Disponível"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formData.limite_disponivel)}
          onChange={() => {}}
          disabled
          className="md:col-span-2"
        />

        <FormInput
          label="Últimos 4 Dígitos"
          value={formData.ultimos_digitos || ''}
          onChange={(value) => updateField('ultimos_digitos', value || null)}
          error={errors.ultimos_digitos}
          placeholder="1234"
        />

        <FormSelect
          label="Dia de Fechamento"
          value={formData.fechamento_fatura.toString()}
          onChange={(value) => updateField('fechamento_fatura', parseInt(value))}
          options={diasOptions}
          error={errors.fechamento_fatura}
          required
        />

        <FormSelect
          label="Dia de Vencimento"
          value={formData.vencimento_fatura.toString()}
          onChange={(value) => updateField('vencimento_fatura', parseInt(value))}
          options={diasOptions}
          error={errors.vencimento_fatura}
          required
        />

        <FormSelect
          label="Conta"
          value={formData.id_conta}
          onChange={(value) => updateField('id_conta', value)}
          options={contas.map(conta => ({
            value: conta.id,
            label: `${conta.nome} - ${conta.instituicao}`
          }))}
          error={errors.id_conta}
          required
          isLoading={isLoadingContas}
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