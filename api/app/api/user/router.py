from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.application.user.dto.usuario_input_dto import UsuarioInputDTO
from app.application.user.use_cases.criar_usuario import CriarUsuarioUseCase
from app.api.user.dependencies import get_usuario_repository
from app.domain.repository.usuario import UsuarioRepository
from app.application.user.use_cases.listar_usuarios import ListarUsuariosUseCase
from app.core.security import verificar_token 


router = APIRouter()
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verificar_token(token)  # Implemente esta função
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    return payload

@router.post("/usuarios")
def criar_usuario(
    dados: UsuarioInputDTO,
    repositorio: UsuarioRepository = Depends(get_usuario_repository)
):
    use_case = CriarUsuarioUseCase(repositorio)
    try:
        usuario = use_case.executar(dados)
        print("Recebendo dados:", dados)
        return {
            "id": str(usuario.id),
            "nome": usuario.nome,
            "email": usuario.email,
            "criado_em": usuario.criado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/usuarios")
def listar_usuarios(
    current_user: dict = Depends(get_current_user),
    repositorio: UsuarioRepository = Depends(get_usuario_repository)
):
    use_case = ListarUsuariosUseCase(repositorio)
    usuarios = use_case.executar()
    return [
        {
            "id": str(u.id),
            "nome": u.nome,
            "email": u.email,
            "criado_em": u.criado_em.isoformat()
        }
        for u in usuarios
    ]