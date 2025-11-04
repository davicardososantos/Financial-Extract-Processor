from app.domain.entities.cliente import Cliente
from app.domain.repository.cliente_repository import ClienteRepository
from app.application.cliente.dto.cliente_input_dto import ClienteInputDTO

class CriarClienteUseCase:
    def __init__(self, repositorio: ClienteRepository):
        self.repositorio = repositorio

    def executar(self, dados: ClienteInputDTO) -> Cliente:
        # Verifica se já existe cliente com este email
        if self.repositorio.obter_por_email(dados.email):
            raise ValueError("Cliente com este e-mail já existe")

        # Verifica se já existe cliente com este CPF
        if self.repositorio.obter_por_cpf(dados.cpf):
            raise ValueError("Cliente com este CPF já existe")

        cliente = Cliente(
            nome=dados.nome,
            email=dados.email,
            cpf=dados.cpf,
            data_nascimento=dados.data_nascimento,
            telefone=dados.telefone
        )
        
        return self.repositorio.salvar(cliente)