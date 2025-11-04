from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class ContaOutputDTO(BaseModel):
    id: UUID
    nome: str
    instituicao: str
    id_cliente: UUID
    criado_em: datetime
    alterado_em: datetime
    deletado_em: datetime | None

    class Config:
        from_attributes = True