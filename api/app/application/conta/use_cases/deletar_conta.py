from uuid import UUID
from app.domain.repository.conta_repository import ContaRepository

class DeletarContaUseCase:
    def __init__(self, repositorio: ContaRepository):
        self.repositorio = repositorio

    def executar(self, conta_id: UUID):
        conta = self.repositorio.obter_por_id(conta_id)
        if not conta:
            raise ValueError("Conta não encontrada")

        conta.soft_delete()
        self.repositorio.salvar(conta)