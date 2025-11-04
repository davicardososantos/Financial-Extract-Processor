from pydantic import BaseModel, constr
from typing import Optional, Annotated

class CategoriaInputDTO(BaseModel):
    nome: Annotated[str, constr(min_length=1, max_length=100)]
    descricao: Optional[str] = None
    cor: Annotated[str, constr(min_length=1, max_length=7)]  # #FFFFFF
    icone: Optional[str] = "📁"