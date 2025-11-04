from abc import ABC, abstractmethod
from uuid import UUID
from typing import Optional, List
from app.domain.entities.conta import Conta

class ContaRepository(ABC):
    @abstractmethod
    def obter_por_id(self, id: UUID) -> Optional[Conta]:
        pass
    
    @abstractmethod
    def obter_por_cliente(self, cliente_id: UUID) -> List[Conta]:
        pass
    
    @abstractmethod
    def obter_por_instituicao(self, instituicao: str) -> List[Conta]:
        pass
    
    @abstractmethod
    def listar_todos(self) -> List[Conta]:
        pass
    
    @abstractmethod
    def criar(self, conta: Conta) -> Conta:
        pass
    
    @abstractmethod
    def atualizar(self, conta: Conta) -> Conta:
        pass
    
    def salvar(self, conta: Conta) -> Conta:
        """Salva o conta (cria ou atualiza automaticamente)"""
        if conta.id:
            return self.atualizar(conta)
        return self.criar(conta)
    
    @abstractmethod
    def excluir(self, id: UUID) -> bool:
        pass