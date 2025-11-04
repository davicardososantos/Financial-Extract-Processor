from pydantic import BaseModel, EmailStr, constr
from typing import Annotated
from datetime import datetime

class ClienteInputDTO(BaseModel):
    nome: str
    email: EmailStr 
    cpf: Annotated[str, constr(min_length=11, max_length=11)] 
    data_nascimento: datetime
    telefone: Annotated[str, constr(min_length=10, max_length=11)] | None = None 