from pydantic import BaseModel, constr, Field
from typing import Annotated, Optional
from datetime import date
from uuid import UUID
from decimal import Decimal

class CartaoCreditoInputDTO(BaseModel):
    limite_total: Annotated[Decimal, Field(gt=0)]
    fechamento_fatura: int  # Dia do mês (1-31)
    vencimento_fatura: int  # Dia do mês (1-31)
    ultimos_digitos: Annotated[Optional[str], constr(max_length=4)] = None
    id_conta: UUID
    id_cliente: UUID