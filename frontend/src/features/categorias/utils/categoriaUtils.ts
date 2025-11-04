import { Categoria } from '../types/categoria';

export class CategoriaUtils {
  static formatarParaExibicao(categoria: Categoria) {
    return {
      ...categoria,
      criadoEmFormatado: new Date(categoria.criado_em).toLocaleDateString('pt-BR'),
      alteradoEmFormatado: new Date(categoria.alterado_em).toLocaleDateString('pt-BR'),
    };
  }

  static validarCategoria(categoria: Partial<Categoria>): string[] {
    const errors: string[] = [];

    if (!categoria.nome?.trim()) {
      errors.push('Nome é obrigatório');
    }

    if (!categoria.cor?.trim()) {
      errors.push('Cor é obrigatória');
    } else if (!/^#[0-9A-F]{6}$/i.test(categoria.cor)) {
      errors.push('Cor deve estar no formato hexadecimal (#FFFFFF)');
    }

    if (!categoria.icone?.trim()) {
      errors.push('Ícone é obrigatório');
    }

    return errors;
  }

  static gerarDadosFake(): Categoria {
    const id = Math.random().toString(36).substr(2, 9);
    const nomes = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer'];
    const cores = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    const icones = ['🍕', '🚗', '🏠', '🏥', '📚', '🎮'];
    
    const randomIndex = Math.floor(Math.random() * nomes.length);
    
    return {
      id,
      nome: nomes[randomIndex],
      descricao: `Categoria para ${nomes[randomIndex].toLowerCase()}`,
      cor: cores[randomIndex],
      icone: icones[randomIndex],
      criado_em: new Date().toISOString(),
      alterado_em: new Date().toISOString(),
      deletado_em: null,
    };
  }
}