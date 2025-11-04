from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional

class Conta:
    def __init__(
        self,
        nome: str,
        instituicao: str,
        id_cliente: UUID,
        id: Optional[UUID] = None,
        criado_em: Optional[datetime] = None,
        alterado_em: Optional[datetime] = None,
        deletado_em: Optional[datetime] = None
    ):
        self.id = id or uuid4()
        self.nome = nome
        self.instituicao = instituicao
        self.id_cliente = id_cliente
        self.criado_em = criado_em or datetime.utcnow()
        self.alterado_em = alterado_em or datetime.utcnow()
        self.deletado_em = deletado_em
    
    def soft_delete(self):
        """Marca a conta como deletada (soft delete)"""
        self.deletado_em = datetime.utcnow()
        self.alterado_em = datetime.utcnow()