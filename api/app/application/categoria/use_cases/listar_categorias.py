from app.domain.repository.categoria_repository import CategoriaRepository

class ListarCategoriasUseCase:
    def __init__(self, repositorio: CategoriaRepository):
        self.repositorio = repositorio

    def executar(self):
        return self.repositorio.listar_todos()