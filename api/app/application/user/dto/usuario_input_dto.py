from pydantic import BaseModel, EmailStr, constr
from typing import Annotated

class UsuarioInputDTO(BaseModel):
    nome: str
    email: EmailStr
    senha: Annotated[str, constr(min_length=8, max_length=72)]