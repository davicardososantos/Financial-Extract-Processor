from uuid import UUID
from app.domain.repository.categoria_repository import CategoriaRepository
from app.domain.entities.categoria import Categoria

class AtualizarCategoriaUseCase:
    def __init__(self, repositorio: CategoriaRepository):
        self.repositorio = repositorio

    def executar(self, categoria_id: UUID, dados) -> Categoria:
        categoria = self.repositorio.obter_por_id(categoria_id)
        if not categoria:
            raise ValueError("Categoria não encontrada")

        # Atualiza apenas os campos fornecidos
        if dados.nome:
            categoria.nome = dados.nome
        if dados.descricao is not None:  # Permite None para remover descrição
            categoria.descricao = dados.descricao
        if dados.cor:
            categoria.cor = dados.cor
        if dados.icone:
            categoria.icone = dados.icone

        return self.repositorio.salvar(categoria)