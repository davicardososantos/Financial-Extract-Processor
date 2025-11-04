from uuid import UUID
from app.domain.repository.conta_repository import ContaRepository

class BuscarContaPorIdUseCase:
    def __init__(self, repositorio: ContaRepository):
        self.repositorio = repositorio

    def executar(self, conta_id: UUID):
        conta = self.repositorio.obter_por_id(conta_id)
        if not conta:
            raise ValueError("Conta não encontrada")
        return conta