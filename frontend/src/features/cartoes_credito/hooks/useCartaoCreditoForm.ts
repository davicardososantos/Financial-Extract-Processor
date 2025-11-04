import { useState, useEffect } from 'react';
import { CartaoCreditoInput } from '../types/cartaoCredito';
import { clienteService } from '@/features/clientes/lib/clienteService';
import { contaService } from '@/features/contas/lib/contaService';
import { Cliente } from '@/features/clientes/types/cliente';
import { Conta } from '@/features/contas/types/conta';

export function useCartaoCreditoForm(initialData?: Partial<CartaoCreditoInput>) {
  const [formData, setFormData] = useState<CartaoCreditoInput>({
    limite_total: initialData?.limite_total || 0,
    limite_disponivel: initialData?.limite_disponivel || 0,
    gasto_atual: initialData?.gasto_atual || 0,
    fechamento_fatura: initialData?.fechamento_fatura || 1, // Dia padrão: 1
    vencimento_fatura: initialData?.vencimento_fatura || 10, // Dia padrão: 10
    ultimos_digitos: initialData?.ultimos_digitos || null,
    id_conta: initialData?.id_conta || '',
    id_cliente: initialData?.id_cliente || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CartaoCreditoInput, string>>>({});
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(false);
  const [isLoadingContas, setIsLoadingContas] = useState(false);

  // Buscar clientes usando o service existente
  useEffect(() => {
    const buscarClientes = async () => {
      setIsLoadingClientes(true);
      try {
        const clientesData = await clienteService.listar();
        setClientes(clientesData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        setClientes([]);
      } finally {
        setIsLoadingClientes(false);
      }
    };

    buscarClientes();
  }, []);

  // Buscar contas usando o service existente
  useEffect(() => {
    const buscarContas = async () => {
      setIsLoadingContas(true);
      try {
        const contasData = await contaService.listar();
        setContas(contasData);
      } catch (error) {
        console.error('Erro ao buscar contas:', error);
        setContas([]);
      } finally {
        setIsLoadingContas(false);
      }
    };

    buscarContas();
  }, []);

  const updateField = (field: keyof CartaoCreditoInput, value: string | number | null) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [field]: value,
      };

      // Recalcula limite disponível se limite_total ou gasto_atual mudar
      if (field === 'limite_total' || field === 'gasto_atual') {
        const novoLimiteTotal = field === 'limite_total' ? Number(value) : prev.limite_total;
        const novoGastoAtual = field === 'gasto_atual' ? Number(value) : prev.gasto_atual;
        const novoLimiteDisponivel = novoLimiteTotal - novoGastoAtual;
        
        updatedData.limite_disponivel = Math.max(0, novoLimiteDisponivel);
      }

      return updatedData;
    });

    // Limpa erro do campo quando usuário começa a digitar
    if (errors[field]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CartaoCreditoInput, string>> = {};

    if (!formData.limite_total || formData.limite_total <= 0) {
      newErrors.limite_total = 'Limite total deve ser maior que zero';
    }

    if (formData.limite_disponivel < 0) {
      newErrors.limite_disponivel = 'Limite disponível não pode ser negativo';
    }

    if (formData.gasto_atual < 0) {
      newErrors.gasto_atual = 'Gasto atual não pode ser negativo';
    }

    if (!formData.fechamento_fatura || formData.fechamento_fatura < 1 || formData.fechamento_fatura > 31) {
      newErrors.fechamento_fatura = 'Dia de fechamento deve ser entre 1 e 31';
    }

    if (!formData.vencimento_fatura || formData.vencimento_fatura < 1 || formData.vencimento_fatura > 31) {
      newErrors.vencimento_fatura = 'Dia de vencimento deve ser entre 1 e 31';
    }

    if (!formData.id_conta.trim()) {
      newErrors.id_conta = 'Conta é obrigatória';
    }

    if (!formData.id_cliente.trim()) {
      newErrors.id_cliente = 'Cliente é obrigatório';
    }

    // Validação dos últimos dígitos (se preenchido)
    if (formData.ultimos_digitos && !/^\d{4}$/.test(formData.ultimos_digitos)) {
      newErrors.ultimos_digitos = 'Últimos dígitos devem ter 4 números';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      limite_total: 0,
      limite_disponivel: 0,
      gasto_atual: 0,
      fechamento_fatura: 1,
      vencimento_fatura: 10,
      ultimos_digitos: null,
      id_conta: '',
      id_cliente: '',
    });
    setErrors({});
  };

  // Função para calcular limite disponível automaticamente
  const calcularLimiteDisponivel = () => {
    const limiteDisponivel = formData.limite_total - formData.gasto_atual;
    updateField('limite_disponivel', Math.max(0, limiteDisponivel));
  };

  return {
    formData,
    errors,
    clientes,
    contas,
    isLoadingClientes,
    isLoadingContas,
    updateField,
    validateForm,
    resetForm,
    calcularLimiteDisponivel,
  };
}