from uuid import UUID
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository

class DeletarCartaoCreditoUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self, cartao_id: UUID):
        cartao = self.repositorio.obter_por_id(cartao_id)
        if not cartao:
            raise ValueError("Cartão de crédito não encontrado")

        cartao.soft_delete()
        self.repositorio.salvar(cartao)