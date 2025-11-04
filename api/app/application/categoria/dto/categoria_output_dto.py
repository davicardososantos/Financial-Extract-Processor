from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional

class CategoriaOutputDTO(BaseModel):
    id: UUID
    nome: str
    descricao: Optional[str]
    cor: str
    icone: str
    criado_em: datetime
    alterado_em: datetime
    deletado_em: Optional[datetime]

    class Config:
        from_attributes = True