export interface Conta {
  id: string;
  nome: string;
  instituicao: string;
  id_cliente: string;
  criado_em: string; // ISO string
  alterado_em: string; // ISO string
  deletado_em: string | null;
}

export interface ContaInput {
  nome: string;
  instituicao: string;
  id_cliente: string;
}

export interface ContaUpdate {
  nome?: string;
  instituicao?: string;
}

export interface ContaListResponse {
  data: Conta[];
}

export interface ContaResponse {
  data: Conta;
}