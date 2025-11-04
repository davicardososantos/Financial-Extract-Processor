from uuid import UUID
from app.domain.repository.categoria_repository import CategoriaRepository

class DeletarCategoriaUseCase:
    def __init__(self, repositorio: CategoriaRepository):
        self.repositorio = repositorio

    def executar(self, categoria_id: UUID):
        categoria = self.repositorio.obter_por_id(categoria_id)
        if not categoria:
            raise ValueError("Categoria não encontrada")

        categoria.soft_delete()
        self.repositorio.salvar(categoria)