from uuid import UUID
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository

class BuscarCartaoCreditoPorIdUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self, cartao_id: UUID):
        cartao = self.repositorio.obter_por_id_completo(cartao_id)
        if not cartao:
            raise ValueError("Cartão de crédito não encontrado")
        return cartao