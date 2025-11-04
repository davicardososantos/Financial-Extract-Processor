from pydantic import BaseModel
from datetime import datetime, date
from uuid import UUID
from typing import Optional
from decimal import Decimal

class CartaoCreditoOutputDTO(BaseModel):
    id: UUID
    limite_total: Decimal
    limite_disponivel: Decimal
    gasto_atual: Decimal
    fechamento_fatura: int
    vencimento_fatura: int
    ultimos_digitos: Optional[str]
    id_conta: UUID
    id_cliente: UUID
    criado_em: datetime
    alterado_em: datetime
    deletado_em: Optional[datetime]

    class Config:
        from_attributes = True