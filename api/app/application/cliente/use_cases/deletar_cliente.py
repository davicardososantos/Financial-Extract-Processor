from uuid import UUID
from app.domain.repository.cliente_repository import ClienteRepository

class DeletarClienteUseCase:
    def __init__(self, repositorio: ClienteRepository):
        self.repositorio = repositorio

    def executar(self, cliente_id: UUID):
        cliente = self.repositorio.obter_por_id(cliente_id)
        if not cliente:
            raise ValueError("Cliente não encontrado")

        cliente.soft_delete()
        self.repositorio.salvar(cliente)