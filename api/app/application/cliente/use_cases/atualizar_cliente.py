from uuid import UUID
from app.domain.repository.cliente_repository import ClienteRepository
from app.domain.entities.cliente import Cliente

class AtualizarClienteUseCase:
    def __init__(self, repositorio: ClienteRepository):
        self.repositorio = repositorio

    def executar(self, cliente_id: UUID, dados) -> Cliente:  # dados agora é qualquer objeto com nome/telefone
        cliente = self.repositorio.obter_por_id(cliente_id)
        if not cliente:
            raise ValueError("Cliente não encontrado")

        # Atualiza apenas os campos fornecidos
        if dados.nome:
            cliente.nome = dados.nome
        if dados.telefone is not None:  # Permite None para remover telefone
            cliente.telefone = dados.telefone

        return self.repositorio.salvar(cliente)