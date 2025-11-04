export interface CartaoCredito {
  id: string;
  limite_total: number;
  limite_disponivel: number;
  gasto_atual: number;
  fechamento_fatura: string; // APENAS O DIA (1-31)
  vencimento_fatura: string; // APENAS O DIA (1-31)
  ultimos_digitos: string | null;
  id_conta: string;
  id_cliente: string;
  criado_em: string;
  alterado_em: string;
  deletado_em: string | null;
}

export interface CartaoCreditoInput {
  limite_total: number;
  limite_disponivel: number;
  gasto_atual: number;
  fechamento_fatura: string; // APENAS O DIA (1-31)
  vencimento_fatura: string; // APENAS O DIA (1-31)
  ultimos_digitos?: string | null;
  id_conta: string;
  id_cliente: string;
}

export interface CartaoCreditoUpdate {
  limite_total?: number;
  limite_disponivel?: number;
  gasto_atual?: number;
  fechamento_fatura?: number; // APENAS O DIA (1-31)
  vencimento_fatura?: number; // APENAS O DIA (1-31)
  ultimos_digitos?: string | null;
  id_conta?: string;
  id_cliente?: string;
}

export interface AtualizarGastoInput {
  gasto_atual: number;
}

export interface CartaoCreditoListResponse {
  data: CartaoCredito[];
}

export interface CartaoCreditoResponse {
  data: CartaoCredito;
}

// Interface para o response do endpoint de atualização de gasto
export interface AtualizarGastoResponse {
  data: {
    limite_disponivel: number;
    gasto_atual: number;
  };
}