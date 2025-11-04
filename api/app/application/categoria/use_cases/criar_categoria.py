from app.domain.entities.categoria import Categoria
from app.domain.repository.categoria_repository import CategoriaRepository
from app.application.categoria.dto.categoria_input_dto import CategoriaInputDTO

class CriarCategoriaUseCase:
    def __init__(self, repositorio: CategoriaRepository):
        self.repositorio = repositorio

    def executar(self, dados: CategoriaInputDTO) -> Categoria:
        # Verifica se já existe categoria com este nome
        if self.repositorio.obter_por_nome(dados.nome):
            raise ValueError("Categoria com este nome já existe")

        categoria = Categoria(
            nome=dados.nome,
            descricao=dados.descricao,
            cor=dados.cor,
            icone=dados.icone
        )
        
        return self.repositorio.salvar(categoria)