export interface Categoria {
  id: string;
  nome: string;
  descricao: string | null;
  cor: string; // #FFFFFF
  icone: string;
  criado_em: string; // ISO string
  alterado_em: string; // ISO string
  deletado_em: string | null;
}

export interface CategoriaInput {
  nome: string;
  descricao: string | null;
  cor: string;
  icone: string;
}

export interface CategoriaUpdate {
  nome?: string;
  descricao?: string | null;
  cor?: string;
  icone?: string;
}

export interface CategoriaListResponse {
  data: Categoria[];
}

export interface CategoriaResponse {
  data: Categoria;
}