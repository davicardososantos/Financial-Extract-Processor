from uuid import UUID
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository

class BuscarCartoesPorContaUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self, conta_id: UUID):
        return self.repositorio.obter_por_conta(conta_id)