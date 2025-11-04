from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID
from pydantic import BaseModel

from app.application.cliente.dto.cliente_input_dto import ClienteInputDTO
from app.application.cliente.use_cases.criar_cliente import CriarClienteUseCase
from app.application.cliente.use_cases.listar_clientes import ListarClientesUseCase
from app.application.cliente.use_cases.buscar_cliente_por_id import BuscarClientePorIdUseCase
from app.application.cliente.use_cases.atualizar_cliente import AtualizarClienteUseCase
from app.application.cliente.use_cases.deletar_cliente import DeletarClienteUseCase

from app.api.cliente.dependencies import get_cliente_repository
from app.domain.repository.cliente_repository import ClienteRepository
from app.core.security import verificar_token

router = APIRouter(prefix="/clientes", tags=["clientes"])
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verificar_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    return payload

@router.post("")
def criar_cliente(
    dados: ClienteInputDTO,
    current_user: dict = Depends(get_current_user),
    repositorio: ClienteRepository = Depends(get_cliente_repository)
):
    use_case = CriarClienteUseCase(repositorio)
    try:
        cliente = use_case.executar(dados)
        return {
            "id": str(cliente.id),
            "nome": cliente.nome,
            "email": cliente.email,
            "cpf": cliente.cpf,
            "data_nascimento": cliente.data_nascimento.isoformat(),
            "telefone": cliente.telefone,
            "criado_em": cliente.criado_em.isoformat(),
            "alterado_em": cliente.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("")
def listar_clientes(
    current_user: dict = Depends(get_current_user),
    repositorio: ClienteRepository = Depends(get_cliente_repository)
):
    use_case = ListarClientesUseCase(repositorio)
    clientes = use_case.executar()
    return [
        {
            "id": str(c.id),
            "nome": c.nome,
            "email": c.email,
            "cpf": c.cpf,
            "data_nascimento": c.data_nascimento.isoformat(),
            "telefone": c.telefone,
            "criado_em": c.criado_em.isoformat(),
            "alterado_em": c.alterado_em.isoformat()
        }
        for c in clientes
    ]

@router.get("/{cliente_id}")
def buscar_cliente_por_id(
    cliente_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: ClienteRepository = Depends(get_cliente_repository)
):
    use_case = BuscarClientePorIdUseCase(repositorio)
    try:
        cliente = use_case.executar(cliente_id)
        return {
            "id": str(cliente.id),
            "nome": cliente.nome,
            "email": cliente.email,
            "cpf": cliente.cpf,
            "data_nascimento": cliente.data_nascimento.isoformat(),
            "telefone": cliente.telefone,
            "criado_em": cliente.criado_em.isoformat(),
            "alterado_em": cliente.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Para atualização, vamos criar um DTO simples inline ou reusar o InputDTO
class ClienteUpdateRequest(BaseModel):
    nome: str | None = None
    telefone: str | None = None

@router.put("/{cliente_id}")
def atualizar_cliente(
    cliente_id: UUID,
    dados: ClienteUpdateRequest,
    current_user: dict = Depends(get_current_user),
    repositorio: ClienteRepository = Depends(get_cliente_repository)
):
    use_case = AtualizarClienteUseCase(repositorio)
    try:
        cliente = use_case.executar(cliente_id, dados)
        return {
            "id": str(cliente.id),
            "nome": cliente.nome,
            "email": cliente.email,
            "cpf": cliente.cpf,
            "data_nascimento": cliente.data_nascimento.isoformat(),
            "telefone": cliente.telefone,
            "criado_em": cliente.criado_em.isoformat(),
            "alterado_em": cliente.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{cliente_id}")
def deletar_cliente(
    cliente_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: ClienteRepository = Depends(get_cliente_repository)
):
    use_case = DeletarClienteUseCase(repositorio)
    try:
        use_case.executar(cliente_id)
        return {"message": "Cliente deletado com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))