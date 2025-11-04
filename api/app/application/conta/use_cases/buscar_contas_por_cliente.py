from uuid import UUID
from app.domain.repository.conta_repository import ContaRepository

class BuscarContasPorClienteUseCase:
    def __init__(self, repositorio: ContaRepository):
        self.repositorio = repositorio

    def executar(self, cliente_id: UUID):
        return self.repositorio.obter_por_cliente(cliente_id)