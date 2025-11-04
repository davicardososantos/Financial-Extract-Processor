from pydantic import BaseModel, constr, Field
from typing import Annotated, Optional
from datetime import date
from decimal import Decimal

class CartaoCreditoUpdateDTO(BaseModel):
    limite_total: Annotated[Optional[Decimal], Field(gt=0)] = None
    fechamento_fatura: Optional[int] = None
    vencimento_fatura: Optional[int] = None
    ultimos_digitos: Annotated[Optional[str], constr(max_length=4)] = None