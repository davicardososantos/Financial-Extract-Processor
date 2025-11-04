from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from .conta import Conta

class Cliente:
    def __init__(
        self, 
        nome: str,
        email: str,
        cpf: str, 
        data_nascimento: datetime,
        telefone: str = None,
        criado_em: datetime = None, 
        alterado_em: datetime = None, 
        deletado_em: datetime = None, 
        id: UUID = None
    ):
        self.id = id or uuid4()
        self.nome = nome
        self.email = email
        self.cpf = cpf
        self.data_nascimento = data_nascimento
        self.telefone = telefone
        self.criado_em = criado_em or datetime.utcnow()
        self.alterado_em = alterado_em or datetime.utcnow()
        self.deletado_em = deletado_em
        self.contas: List[Conta] = []
        
    
    def soft_delete(self):
        """Marca o cliente como deletado (soft delete)"""
        self.deletado_em = datetime.utcnow()
        self.alterado_em = datetime.utcnow()