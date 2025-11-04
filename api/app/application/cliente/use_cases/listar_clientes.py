from app.domain.repository.cliente_repository import ClienteRepository

class ListarClientesUseCase:
    def __init__(self, repositorio: ClienteRepository):
        self.repositorio = repositorio

    def executar(self):
        return self.repositorio.listar_todos()