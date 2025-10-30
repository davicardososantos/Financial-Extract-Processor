from datetime import datetime
from uuid import UUID, uuid4

class Cliente:
    def __init__(
        self, 
        nome: str, 
        criado_em: datetime = None, 
        alterado_em: datetime = None, 
        deletado_em: datetime = None, 
        id: UUID = None
    ):
        self.id = id or uuid4()
        self.nome = nome
        self.criado_em = criado_em or datetime.utcnow()
        self.alterado_em = alterado_em or datetime.utcnow()
        self.deletado_em = deletado_em