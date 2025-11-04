import { Conta } from '../types/conta';

export class ContaUtils {
  static formatarParaExibicao(conta: Conta) {
    return {
      ...conta,
      criadoEmFormatado: new Date(conta.criado_em).toLocaleDateString('pt-BR'),
      alteradoEmFormatado: new Date(conta.alterado_em).toLocaleDateString('pt-BR'),
    };
  }

  // Métodos específicos do domínio Conta
  static validarConta(conta: Partial<Conta>): string[] {
    const errors: string[] = [];

    if (!conta.nome?.trim()) {
      errors.push('Nome é obrigatório');
    }

    if (!conta.instituicao?.trim()) {
      errors.push('Instituição é obrigatória');
    }

    if (!conta.id_cliente) {
      errors.push('Cliente é obrigatório');
    }

    return errors;
  }

  static gerarDadosFake(): Conta {
    const id = Math.random().toString(36).substr(2, 9);
    const nomes = ['Conta Corrente', 'Conta Poupança', 'Conta Salário', 'Conta Investimento'];
    const instituicoes = ['Banco do Brasil', 'Itaú', 'Bradesco', 'Santander', 'Nubank'];
    const clientesIds = [
      'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      'b2c3d4e5-f6g7-8901-bcde-fg2345678901',
      'c3d4e5f6-g7h8-9012-cdef-gh3456789012'
    ];
    
    const randomNomeIndex = Math.floor(Math.random() * nomes.length);
    const randomInstituicaoIndex = Math.floor(Math.random() * instituicoes.length);
    const randomClienteIndex = Math.floor(Math.random() * clientesIds.length);
    
    return {
      id,
      nome: nomes[randomNomeIndex],
      instituicao: instituicoes[randomInstituicaoIndex],
      id_cliente: clientesIds[randomClienteIndex],
      criado_em: new Date().toISOString(),
      alterado_em: new Date().toISOString(),
      deletado_em: null,
    };
  }
}