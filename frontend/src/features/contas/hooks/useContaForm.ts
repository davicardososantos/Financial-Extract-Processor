import { useState, useEffect } from 'react'; 
import { ContaInput } from '../types/conta';
import { Validators } from '@/lib';
import { clienteService } from '@/features/clientes/lib/clienteService'; 
import { Cliente } from '@/features/clientes/types/cliente'; 

export function useContaForm(initialData?: Partial<ContaInput>) {
  const [formData, setFormData] = useState<ContaInput>({
    nome: initialData?.nome || '',
    instituicao: initialData?.instituicao || '',
    id_cliente: initialData?.id_cliente || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContaInput, string>>>({});
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(false);

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        setIsLoadingClientes(true);
        const clientesData = await clienteService.listar();
        setClientes(clientesData);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      } finally {
        setIsLoadingClientes(false);
      }
    };

    carregarClientes();
  }, []);

  const updateField = (field: keyof ContaInput, value: string) => {
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
    const newErrors: Partial<Record<keyof ContaInput, string>> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.instituicao.trim()) {
      newErrors.instituicao = 'Instituição é obrigatória';
    }

    if (!formData.id_cliente.trim()) {
      newErrors.id_cliente = 'Cliente é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      instituicao: '',
      id_cliente: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    clientes, 
    isLoadingClientes, 
    updateField,
    validateForm,
    resetForm,
  };
}