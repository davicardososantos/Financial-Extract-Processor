from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional

class Categoria:
    def __init__(
        self,
        nome: str,
        cor: str,
        icone: str = "📁",  
        descricao: Optional[str] = None,
        id: Optional[UUID] = None,
        criado_em: Optional[datetime] = None,
        alterado_em: Optional[datetime] = None,
        deletado_em: Optional[datetime] = None
    ):
        self.id = id or uuid4()
        self.nome = nome
        self.descricao = descricao
        self.cor = cor
        self.icone = icone  
        self.criado_em = criado_em or datetime.utcnow()
        self.alterado_em = alterado_em or datetime.utcnow()
        self.deletado_em = deletado_em
    
    def soft_delete(self):
        """Marca a categoria como deletada (soft delete)"""
        self.deletado_em = datetime.utcnow()
        self.alterado_em = datetime.utcnow()