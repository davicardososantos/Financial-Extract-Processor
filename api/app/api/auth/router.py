from fastapi import APIRouter, Depends, HTTPException
from app.core.security import criar_token, verificar_senha
from app.domain.repository.usuario_repository import UsuarioRepository
from app.api.usuario.dependencies import get_usuario_repository
from pydantic import BaseModel

router = APIRouter()

class LoginDTO(BaseModel):
    email: str
    senha: str

@router.post("/login")
def login(
    dados: LoginDTO,
    repositorio: UsuarioRepository = Depends(get_usuario_repository)
):
    usuario = repositorio.buscar_por_email(dados.email)
    if not usuario or not verificar_senha(dados.senha, usuario.senha_hash):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = criar_token({"sub": usuario.email})
    return {"access_token": token, "token_type": "bearer"}