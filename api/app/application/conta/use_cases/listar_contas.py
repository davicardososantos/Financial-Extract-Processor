from app.domain.repository.conta_repository import ContaRepository

class ListarContasUseCase:
    def __init__(self, repositorio: ContaRepository):
        self.repositorio = repositorio

    def executar(self):
        return self.repositorio.listar_todos()