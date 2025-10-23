from datetime import datetime
from uuid import UUID, uuid4

class Usuario:
    def __init__(self, nome: str, email: str, senha_hash: str, criado_em: datetime = None, id: UUID = None):
        self.id = id or uuid4()
        self.nome = nome
        self.email = email
        self.criado_em = criado_em or datetime.utcnow()
        self.senha_hash = senha_hash