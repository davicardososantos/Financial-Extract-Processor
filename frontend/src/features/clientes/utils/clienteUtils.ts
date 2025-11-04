import { Cliente } from '../types/cliente';
import { Formatters, Validators } from '@/lib';

export class ClienteUtils {
  static formatarParaExibicao(cliente: Cliente) {
    return {
      ...cliente,
      cpfFormatado: Formatters.formatarCPF(cliente.cpf),
      telefoneFormatado: Formatters.formatarTelefone(cliente.telefone),
      dataNascimentoFormatada: Formatters.formatarData(cliente.data_nascimento),
      criadoEmFormatado: Formatters.formatarDataHora(cliente.criado_em),
      idade: Formatters.calcularIdade(cliente.data_nascimento),
    };
  }

  // Métodos específicos do domínio Cliente
  static validarCliente(cliente: Partial<Cliente>): string[] {
    const errors: string[] = [];

    if (!cliente.nome?.trim()) {
      errors.push('Nome é obrigatório');
    }

    if (!cliente.email || !Validators.validarEmail(cliente.email)) {
      errors.push('Email inválido');
    }

    if (!cliente.cpf || !Validators.validarCPF(cliente.cpf)) {
      errors.push('CPF inválido');
    }

    if (!cliente.data_nascimento || !Validators.validarDataNascimento(cliente.data_nascimento)) {
      errors.push('Data de nascimento inválida ou menor de 18 anos');
    }

    return errors;
  }

  static gerarDadosFake(): Cliente {
    const id = Math.random().toString(36).substr(2, 9);
    const nomes = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Souza'];
    const emails = ['joao@email.com', 'maria@email.com', 'pedro@email.com', 'ana@email.com', 'carlos@email.com'];
    const cpfs = ['12345678901', '23456789012', '34567890123', '45678901234', '56789012345'];
    const telefones = ['11999999999', '21988888888', '31977777777', '41966666666', '51955555555'];
    
    const randomIndex = Math.floor(Math.random() * nomes.length);
    const dataNascimento = new Date(1980 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
    
    return {
      id,
      nome: nomes[randomIndex],
      email: emails[randomIndex],
      cpf: cpfs[randomIndex],
      data_nascimento: dataNascimento.toISOString(),
      telefone: telefones[randomIndex],
      criado_em: new Date().toISOString(),
      alterado_em: new Date().toISOString(),
      deletado_em: null,
    };
  }
}