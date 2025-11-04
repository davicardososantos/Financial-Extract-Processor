from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository

class ListarCartoesCreditoUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self):
        return self.repositorio.listar_todos()