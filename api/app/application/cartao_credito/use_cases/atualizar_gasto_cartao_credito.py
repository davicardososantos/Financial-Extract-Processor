from uuid import UUID
from decimal import Decimal
from app.domain.entities.cartao_credito import CartaoCredito
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository

class AtualizarGastoCartaoCreditoUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self, cartao_id: UUID, gasto_atual: Decimal) -> CartaoCredito:
        if gasto_atual < 0:
            raise ValueError("Gasto atual não pode ser negativo")

        return self.repositorio.atualizar_gasto(cartao_id, gasto_atual)