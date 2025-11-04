from app.domain.entities.conta import Conta
from app.domain.repository.conta_repository import ContaRepository
from app.application.conta.dto.conta_input_dto import ContaInputDTO

class CriarContaUseCase:
    def __init__(self, repositorio: ContaRepository):
        self.repositorio = repositorio

    def executar(self, dados: ContaInputDTO) -> Conta:
        conta = Conta(
            nome=dados.nome,
            instituicao=dados.instituicao,
            id_cliente=dados.id_cliente
        )
        
        return self.repositorio.salvar(conta)