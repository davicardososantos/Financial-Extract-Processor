from uuid import UUID
from app.domain.repository.conta_repository import ContaRepository
from app.domain.entities.conta import Conta

class AtualizarContaUseCase:
    def __init__(self, repositorio: ContaRepository):
        self.repositorio = repositorio

    def executar(self, conta_id: UUID, dados) -> Conta:
        conta = self.repositorio.obter_por_id(conta_id)
        if not conta:
            raise ValueError("Conta não encontrada")

        # Atualiza apenas os campos fornecidos
        if dados.nome:
            conta.nome = dados.nome
        if dados.instituicao:
            conta.instituicao = dados.instituicao

        return self.repositorio.salvar(conta)