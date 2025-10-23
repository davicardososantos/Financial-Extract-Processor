from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class UsuarioOutputDTO(BaseModel):
    id: UUID
    nome: str
    email: str
    criado_em: datetime

    class Config:
        from_attributes = True