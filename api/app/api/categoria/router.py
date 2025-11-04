from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID
from pydantic import BaseModel

from app.application.categoria.dto.categoria_input_dto import CategoriaInputDTO
from app.application.categoria.use_cases.criar_categoria import CriarCategoriaUseCase
from app.application.categoria.use_cases.listar_categorias import ListarCategoriasUseCase
from app.application.categoria.use_cases.buscar_categoria_por_id import BuscarCategoriaPorIdUseCase
from app.application.categoria.use_cases.atualizar_categoria import AtualizarCategoriaUseCase
from app.application.categoria.use_cases.deletar_categoria import DeletarCategoriaUseCase

from app.api.categoria.dependencies import get_categoria_repository
from app.domain.repository.categoria_repository import CategoriaRepository
from app.core.security import verificar_token

router = APIRouter(prefix="/categorias", tags=["categorias"])
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verificar_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    return payload

@router.post("")
def criar_categoria(
    dados: CategoriaInputDTO,
    current_user: dict = Depends(get_current_user),
    repositorio: CategoriaRepository = Depends(get_categoria_repository)
):
    use_case = CriarCategoriaUseCase(repositorio)
    try:
        categoria = use_case.executar(dados)
        return {
            "id": str(categoria.id),
            "nome": categoria.nome,
            "descricao": categoria.descricao,
            "cor": categoria.cor,
            "icone": categoria.icone,
            "criado_em": categoria.criado_em.isoformat(),
            "alterado_em": categoria.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("")
def listar_categorias(
    current_user: dict = Depends(get_current_user),
    repositorio: CategoriaRepository = Depends(get_categoria_repository)
):
    use_case = ListarCategoriasUseCase(repositorio)
    categorias = use_case.executar()
    return [
        {
            "id": str(c.id),
            "nome": c.nome,
            "descricao": c.descricao,
            "cor": c.cor,
            "icone": c.icone,
            "criado_em": c.criado_em.isoformat(),
            "alterado_em": c.alterado_em.isoformat()
        }
        for c in categorias
    ]

@router.get("/{categoria_id}")
def buscar_categoria_por_id(
    categoria_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: CategoriaRepository = Depends(get_categoria_repository)
):
    use_case = BuscarCategoriaPorIdUseCase(repositorio)
    try:
        categoria = use_case.executar(categoria_id)
        return {
            "id": str(categoria.id),
            "nome": categoria.nome,
            "descricao": categoria.descricao,
            "cor": categoria.cor,
            "icone": categoria.icone,
            "criado_em": categoria.criado_em.isoformat(),
            "alterado_em": categoria.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

class CategoriaUpdateRequest(BaseModel):
    nome: str | None = None
    descricao: str | None = None
    cor: str | None = None
    icone: str | None = None

@router.put("/{categoria_id}")
def atualizar_categoria(
    categoria_id: UUID,
    dados: CategoriaUpdateRequest,
    current_user: dict = Depends(get_current_user),
    repositorio: CategoriaRepository = Depends(get_categoria_repository)
):
    use_case = AtualizarCategoriaUseCase(repositorio)
    try:
        categoria = use_case.executar(categoria_id, dados)
        return {
            "id": str(categoria.id),
            "nome": categoria.nome,
            "descricao": categoria.descricao,
            "cor": categoria.cor,
            "icone": categoria.icone,
            "criado_em": categoria.criado_em.isoformat(),
            "alterado_em": categoria.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{categoria_id}")
def deletar_categoria(
    categoria_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: CategoriaRepository = Depends(get_categoria_repository)
):
    use_case = DeletarCategoriaUseCase(repositorio)
    try:
        use_case.executar(categoria_id)
        return {"message": "Categoria deletada com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))