import { CartaoCredito } from '../types/cartaoCredito';

export class CartaoCreditoUtils {
  static formatarParaExibicao(cartao: CartaoCredito) {
    return {
      ...cartao,
      criadoEmFormatado: new Date(cartao.criado_em).toLocaleDateString('pt-BR'),
      alteradoEmFormatado: new Date(cartao.alterado_em).toLocaleDateString('pt-BR'),
      fechamentoFaturaFormatado: new Date(cartao.fechamento_fatura).toLocaleDateString('pt-BR'),
      vencimentoFaturaFormatado: new Date(cartao.vencimento_fatura).toLocaleDateString('pt-BR'),
      limiteTotalFormatado: new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
      }).format(cartao.limite_total),
      limiteDisponivelFormatado: new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
      }).format(cartao.limite_disponivel),
      gastoAtualFormatado: new Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
      }).format(cartao.gasto_atual),
      porcentagemUtilizada: (cartao.gasto_atual / cartao.limite_total) * 100,
    };
  }

  static validarCartao(cartao: Partial<CartaoCredito>): string[] {
    const errors: string[] = [];

    if (!cartao.limite_total || cartao.limite_total <= 0) {
      errors.push('Limite total deve ser maior que zero');
    }

    if (cartao.limite_disponivel !== undefined && cartao.limite_disponivel < 0) {
      errors.push('Limite disponível não pode ser negativo');
    }

    if (cartao.gasto_atual !== undefined && cartao.gasto_atual < 0) {
      errors.push('Gasto atual não pode ser negativo');
    }

    if (!cartao.fechamento_fatura) {
      errors.push('Data de fechamento da fatura é obrigatória');
    }

    if (!cartao.vencimento_fatura) {
      errors.push('Data de vencimento da fatura é obrigatória');
    }

    // Valida se vencimento é após fechamento
    if (cartao.fechamento_fatura && cartao.vencimento_fatura) {
      const fechamento = new Date(cartao.fechamento_fatura);
      const vencimento = new Date(cartao.vencimento_fatura);
      
      if (vencimento <= fechamento) {
        errors.push('Vencimento deve ser após o fechamento');
      }
    }

    if (!cartao.id_conta) {
      errors.push('Conta é obrigatória');
    }

    if (!cartao.id_cliente) {
      errors.push('Cliente é obrigatório');
    }

    // Validação dos últimos dígitos (se preenchido)
    if (cartao.ultimos_digitos && !/^\d{4}$/.test(cartao.ultimos_digitos)) {
      errors.push('Últimos dígitos devem ter 4 números');
    }

    return errors;
  }

  static calcularLimiteDisponivel(limiteTotal: number, gastoAtual: number): number {
    return Math.max(0, limiteTotal - gastoAtual);
  }

  static calcularPorcentagemUtilizada(limiteTotal: number, gastoAtual: number): number {
    if (limiteTotal === 0) return 0;
    return (gastoAtual / limiteTotal) * 100;
  }

  static getStatusLimite(porcentagemUtilizada: number): {
    status: 'baixo' | 'medio' | 'alto' | 'critico';
    cor: string;
    texto: string;
  } {
    if (porcentagemUtilizada >= 90) {
      return { 
        status: 'critico', 
        cor: 'text-red-600 bg-red-100', 
        texto: 'Limite Crítico' 
      };
    } else if (porcentagemUtilizada >= 70) {
      return { 
        status: 'alto', 
        cor: 'text-orange-600 bg-orange-100', 
        texto: 'Limite Alto' 
      };
    } else if (porcentagemUtilizada >= 40) {
      return { 
        status: 'medio', 
        cor: 'text-yellow-600 bg-yellow-100', 
        texto: 'Limite Médio' 
      };
    } else {
      return { 
        status: 'baixo', 
        cor: 'text-green-600 bg-green-100', 
        texto: 'Limite Baixo' 
      };
    }
  }

  static gerarDadosFake(): CartaoCredito {
    const id = Math.random().toString(36).substr(2, 9);
    const limiteTotal = Math.floor(Math.random() * 10000) + 1000;
    const gastoAtual = Math.floor(Math.random() * limiteTotal);
    const limiteDisponivel = limiteTotal - gastoAtual;

    // Gerar datas: fechamento no dia 5 e vencimento no dia 20 do próximo mês
    const hoje = new Date();
    const fechamento = new Date(hoje.getFullYear(), hoje.getMonth(), 5);
    const vencimento = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 20);

    return {
      id,
      limite_total: limiteTotal,
      limite_disponivel: limiteDisponivel,
      gasto_atual: gastoAtual,
      fechamento_fatura: fechamento.getDate(),
      vencimento_fatura: vencimento.getDate(),
      ultimos_digitos: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      id_conta: Math.random().toString(36).substr(2, 9),
      id_cliente: Math.random().toString(36).substr(2, 9),
      criado_em: new Date().toISOString(),
      alterado_em: new Date().toISOString(),
      deletado_em: null,
    };
  }

  static formatarUltimosDigitos(ultimosDigitos: string | null): string {
    return ultimosDigitos ? `•••• ${ultimosDigitos}` : 'Cartão de Crédito';
  }

  static getDiasAteVencimento(vencimentoFatura: string): number {
    const hoje = new Date();
    const vencimento = new Date(vencimentoFatura);
    const diffTime = vencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  static getStatusVencimento(diasAteVencimento: number): {
    status: 'longe' | 'proximo' | 'hoje' | 'atrasado';
    cor: string;
    texto: string;
  } {
    if (diasAteVencimento < 0) {
      return { 
        status: 'atrasado', 
        cor: 'text-red-600 bg-red-100', 
        texto: 'Fatura Atrasada' 
      };
    } else if (diasAteVencimento === 0) {
      return { 
        status: 'hoje', 
        cor: 'text-orange-600 bg-orange-100', 
        texto: 'Vence Hoje' 
      };
    } else if (diasAteVencimento <= 5) {
      return { 
        status: 'proximo', 
        cor: 'text-yellow-600 bg-yellow-100', 
        texto: `Vence em ${diasAteVencimento} dias` 
      };
    } else {
      return { 
        status: 'longe', 
        cor: 'text-green-600 bg-green-100', 
        texto: `Vence em ${diasAteVencimento} dias` 
      };
    }
  }
}