from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from uuid import UUID
from pydantic import BaseModel

from app.application.cartao_credito.dto.cartao_credito_input_dto import CartaoCreditoInputDTO
from app.application.cartao_credito.dto.cartao_credito_update_dto import CartaoCreditoUpdateDTO
from app.application.cartao_credito.dto.cartao_credito_update_gasto_dto import CartaoCreditoUpdateGastoDTO

from app.application.cartao_credito.use_cases.criar_cartao_credito import CriarCartaoCreditoUseCase
from app.application.cartao_credito.use_cases.listar_cartoes_credito import ListarCartoesCreditoUseCase
from app.application.cartao_credito.use_cases.buscar_cartao_credito_por_id import BuscarCartaoCreditoPorIdUseCase
from app.application.cartao_credito.use_cases.atualizar_cartao_credito import AtualizarCartaoCreditoUseCase
from app.application.cartao_credito.use_cases.atualizar_gasto_cartao_credito import AtualizarGastoCartaoCreditoUseCase
from app.application.cartao_credito.use_cases.deletar_cartao_credito import DeletarCartaoCreditoUseCase
from app.application.cartao_credito.use_cases.buscar_cartoes_por_cliente import BuscarCartoesPorClienteUseCase
from app.application.cartao_credito.use_cases.buscar_cartoes_por_conta import BuscarCartoesPorContaUseCase

from app.api.cartao_credito.dependencies import get_cartao_credito_repository
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository
from app.core.security import verificar_token

router = APIRouter(prefix="/cartoes-credito", tags=["cartoes-credito"])
security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verificar_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    return payload

@router.post("")
def criar_cartao_credito(
    dados: CartaoCreditoInputDTO,
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = CriarCartaoCreditoUseCase(repositorio)
    try:
        cartao = use_case.executar(dados)
        return {
            "id": str(cartao.id),
            "limite_total": float(cartao.limite_total),
            "limite_disponivel": float(cartao.limite_disponivel),
            "gasto_atual": float(cartao.gasto_atual),
            "fechamento_fatura": cartao.fechamento_fatura,
            "vencimento_fatura": cartao.vencimento_fatura,
            "ultimos_digitos": cartao.ultimos_digitos,
            "id_conta": str(cartao.id_conta),
            "id_cliente": str(cartao.id_cliente),
            "criado_em": cartao.criado_em.isoformat(),
            "alterado_em": cartao.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("")
def listar_cartoes_credito(
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = ListarCartoesCreditoUseCase(repositorio)
    cartoes = use_case.executar()
    return [
        {
            "id": str(c.id),
            "limite_total": float(c.limite_total),
            "limite_disponivel": float(c.limite_disponivel),
            "gasto_atual": float(c.gasto_atual),
            "fechamento_fatura": c.fechamento_fatura,
            "vencimento_fatura": c.vencimento_fatura,
            "ultimos_digitos": c.ultimos_digitos,
            "id_conta": str(c.id_conta),
            "id_cliente": str(c.id_cliente),
            "criado_em": c.criado_em.isoformat(),
            "alterado_em": c.alterado_em.isoformat()
        }
        for c in cartoes
    ]

@router.get("/{cartao_id}")
def buscar_cartao_credito_por_id(
    cartao_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = BuscarCartaoCreditoPorIdUseCase(repositorio)
    try:
        cartao = use_case.executar(cartao_id)
        return {
            "id": str(cartao.id),
            "limite_total": float(cartao.limite_total),
            "limite_disponivel": float(cartao.limite_disponivel),
            "gasto_atual": float(cartao.gasto_atual),
            "fechamento_fatura": cartao.fechamento_fatura,
            "vencimento_fatura": cartao.vencimento_fatura,
            "ultimos_digitos": cartao.ultimos_digitos,
            "id_conta": str(cartao.id_conta),
            "id_cliente": str(cartao.id_cliente),
            "criado_em": cartao.criado_em.isoformat(),
            "alterado_em": cartao.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/cliente/{cliente_id}")
def buscar_cartoes_por_cliente(
    cliente_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = BuscarCartoesPorClienteUseCase(repositorio)
    try:
        cartoes = use_case.executar(cliente_id)
        return [
            {
                "id": str(c.id),
                "limite_total": float(c.limite_total),
                "limite_disponivel": float(c.limite_disponivel),
                "gasto_atual": float(c.gasto_atual),
                "fechamento_fatura": c.fechamento_fatura,
                "vencimento_fatura": c.vencimento_fatura,
                "ultimos_digitos": c.ultimos_digitos,
                "id_conta": str(c.id_conta),
                "id_cliente": str(c.id_cliente),
                "criado_em": c.criado_em.isoformat(),
                "alterado_em": c.alterado_em.isoformat()
            }
            for c in cartoes
        ]
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/conta/{conta_id}")
def buscar_cartoes_por_conta(
    conta_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = BuscarCartoesPorContaUseCase(repositorio)
    try:
        cartoes = use_case.executar(conta_id)
        return [
            {
                "id": str(c.id),
                "limite_total": float(c.limite_total),
                "limite_disponivel": float(c.limite_disponivel),
                "gasto_atual": float(c.gasto_atual),
                "fechamento_fatura": c.fechamento_fatura,
                "vencimento_fatura": c.vencimento_fatura,
                "ultimos_digitos": c.ultimos_digitos,
                "id_conta": str(c.id_conta),
                "id_cliente": str(c.id_cliente),
                "criado_em": c.criado_em.isoformat(),
                "alterado_em": c.alterado_em.isoformat()
            }
            for c in cartoes
        ]
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{cartao_id}")
def atualizar_cartao_credito(
    cartao_id: UUID,
    dados: CartaoCreditoUpdateDTO,
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = AtualizarCartaoCreditoUseCase(repositorio)
    try:
        cartao = use_case.executar(cartao_id, dados)
        return {
            "id": str(cartao.id),
            "limite_total": float(cartao.limite_total),
            "limite_disponivel": float(cartao.limite_disponivel),
            "gasto_atual": float(cartao.gasto_atual),
            "fechamento_fatura": cartao.fechamento_fatura,
            "vencimento_fatura": cartao.vencimento_fatura,
            "ultimos_digitos": cartao.ultimos_digitos,
            "id_conta": str(cartao.id_conta),
            "id_cliente": str(cartao.id_cliente),
            "criado_em": cartao.criado_em.isoformat(),
            "alterado_em": cartao.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.patch("/{cartao_id}/gasto")
def atualizar_gasto_cartao_credito(
    cartao_id: UUID,
    dados: CartaoCreditoUpdateGastoDTO,
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = AtualizarGastoCartaoCreditoUseCase(repositorio)
    try:
        cartao = use_case.executar(cartao_id, dados.gasto_atual)
        return {
            "id": str(cartao.id),
            "limite_total": float(cartao.limite_total),
            "limite_disponivel": float(cartao.limite_disponivel),
            "gasto_atual": float(cartao.gasto_atual),
            "fechamento_fatura": cartao.fechamento_fatura,
            "vencimento_fatura": cartao.vencimento_fatura,
            "ultimos_digitos": cartao.ultimos_digitos,
            "id_conta": str(cartao.id_conta),
            "id_cliente": str(cartao.id_cliente),
            "criado_em": cartao.criado_em.isoformat(),
            "alterado_em": cartao.alterado_em.isoformat()
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{cartao_id}")
def deletar_cartao_credito(
    cartao_id: UUID,
    current_user: dict = Depends(get_current_user),
    repositorio: CartaoCreditoRepository = Depends(get_cartao_credito_repository)
):
    use_case = DeletarCartaoCreditoUseCase(repositorio)
    try:
        use_case.executar(cartao_id)
        return {"message": "Cartão de crédito deletado com sucesso"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))