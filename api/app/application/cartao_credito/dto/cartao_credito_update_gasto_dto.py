from pydantic import BaseModel, constr, Field
from typing import Annotated
from decimal import Decimal

class CartaoCreditoUpdateGastoDTO(BaseModel):
    gasto_atual: Annotated[Decimal, Field(ge=0)]