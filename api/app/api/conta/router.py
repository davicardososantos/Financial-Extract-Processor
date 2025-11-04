from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID
from pydantic import BaseModel

from app.application.conta.dto.conta_input_dto import ContaInputDTO
from app.application.conta.use_cases.criar_conta import CriarContaUseCase
from app.application.conta.use_cases.listar_contas import ListarContasUseCase
from app.application.conta.use_cases.buscar_conta_por_id import BuscarContaPorIdUseCase
from app.application.conta.use_cases.atualizar_conta import AtualizarContaUseCase
from app.application.conta.use_cases.deletar_conta import DeletarContaUseCase
from app.application.conta.use_cases.buscar_contas_por_cliente import BuscarContasPorClienteUseCase

from app.api.conta.dependencies import get_conta_repository
from app.domain.repository.conta_repository import ContaRepository
from app.core.security import verificar_token

router = APIRouter(prefix="/contas", tags=["contas"])
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verificar_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    return payload

@router.post("")
def criar_conta(
    dados: ContaInputDTO,
    current_user: dict = Depends(get_current_user),
    repositorio: ContaRepository = Depends(get_conta_repository)
):
    use_case = CriarContaUseCase(repositorio)
    try:
        conta = use_case.executar(dados)
        return {
            "id": str(conta.id),
            "nome": conta.nome,
            "instituicao": conta.instituicao,
            "id_cliente": str(conta.id_cliente),
            "criado_em": conta.criado_em.isoformat(),
            "alterado_em": conta.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("")
def listar_contas(
    current_user: dict = Depends(get_current_user),
    repositorio: ContaRepository = Depends(get_conta_repository)
):
    use_case = ListarContasUseCase(repositorio)
    contas = use_case.executar()
    return [
        {
            "id": str(c.id),
            "nome": c.nome,
            "instituicao": c.instituicao,
            "id_cliente": str(c.id_cliente),
            "criado_em": c.criado_em.isoformat(),
            "alterado_em": c.alterado_em.isoformat()
        }
        for c in contas
    ]

@router.get("/{conta_id}")
def buscar_conta_por_id(
    conta_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: ContaRepository = Depends(get_conta_repository)
):
    use_case = BuscarContaPorIdUseCase(repositorio)
    try:
        conta = use_case.executar(conta_id)
        return {
            "id": str(conta.id),
            "nome": conta.nome,
            "instituicao": conta.instituicao,
            "id_cliente": str(conta.id_cliente),
            "criado_em": conta.criado_em.isoformat(),
            "alterado_em": conta.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/cliente/{cliente_id}")
def buscar_contas_por_cliente(
    cliente_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: ContaRepository = Depends(get_conta_repository)
):
    use_case = BuscarContasPorClienteUseCase(repositorio)
    try:
        contas = use_case.executar(cliente_id)
        return [
            {
                "id": str(c.id),
                "nome": c.nome,
                "instituicao": c.instituicao,
                "id_cliente": str(c.id_cliente),
                "criado_em": c.criado_em.isoformat(),
                "alterado_em": c.alterado_em.isoformat()
            }
            for c in contas
        ]
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

class ContaUpdateRequest(BaseModel):
    nome: str | None = None
    instituicao: str | None = None

@router.put("/{conta_id}")
def atualizar_conta(
    conta_id: UUID,
    dados: ContaUpdateRequest,
    current_user: dict = Depends(get_current_user),
    repositorio: ContaRepository = Depends(get_conta_repository)
):
    use_case = AtualizarContaUseCase(repositorio)
    try:
        conta = use_case.executar(conta_id, dados)
        return {
            "id": str(conta.id),
            "nome": conta.nome,
            "instituicao": conta.instituicao,
            "id_cliente": str(conta.id_cliente),
            "criado_em": conta.criado_em.isoformat(),
            "alterado_em": conta.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{conta_id}")
def deletar_conta(
    conta_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: ContaRepository = Depends(get_conta_repository)
):
    use_case = DeletarContaUseCase(repositorio)
    try:
        use_case.executar(conta_id)
        return {"message": "Conta deletada com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))