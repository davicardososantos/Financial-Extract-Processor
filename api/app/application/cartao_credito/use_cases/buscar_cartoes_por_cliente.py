from uuid import UUID
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository

class BuscarCartoesPorClienteUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self, cliente_id: UUID):
        return self.repositorio.obter_por_cliente(cliente_id)