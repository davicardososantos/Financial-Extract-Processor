from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class ClienteOutputDTO(BaseModel):
    id: UUID
    nome: str
    email: str
    cpf: str
    data_nascimento: datetime
    telefone: str | None
    criado_em: datetime
    alterado_em: datetime
    deletado_em: datetime | None

    class Config:
        from_attributes = True