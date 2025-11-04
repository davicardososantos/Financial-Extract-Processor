export interface Cliente {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: string; // ISO string
  telefone: string | null;
  criado_em: string; // ISO string
  alterado_em: string; // ISO string
  deletado_em: string | null;
}

export interface ClienteInput {
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: string; // ISO string
  telefone: string | null;
}

export interface ClienteUpdate {
  nome?: string;
  telefone?: string | null;
}

export interface ClienteListResponse {
  data: Cliente[];
}

export interface ClienteResponse {
  data: Cliente;
}