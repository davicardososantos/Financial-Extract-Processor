from pydantic import BaseModel, constr
from typing import Annotated
from uuid import UUID

class ContaInputDTO(BaseModel):
    nome: Annotated[str, constr(min_length=1, max_length=100)]
    instituicao: Annotated[str, constr(min_length=1, max_length=100)]
    id_cliente: UUID