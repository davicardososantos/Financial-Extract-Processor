from abc import ABC, abstractmethod
from uuid import UUID
from typing import Optional
from app.domain.entities.cliente import Cliente

class ClienteRepository(ABC):
    @abstractmethod
    def obter_por_id(self, id: UUID) -> Optional[Cliente]:
        pass
    
    @abstractmethod
    def obter_por_email(self, email: str) -> Optional[Cliente]:
        pass
    
    @abstractmethod
    def obter_por_cpf(self, cpf: str) -> Optional[Cliente]:
        pass
    
    @abstractmethod
    def listar_todos(self) -> list[Cliente]:
        pass
    
    @abstractmethod
    def criar(self, cliente: Cliente) -> Cliente:
        pass
    
    @abstractmethod
    def atualizar(self, cliente: Cliente) -> Cliente:
        pass
    
    def salvar(self, cliente: Cliente) -> Cliente:
        """Salva o cliente (cria ou atualiza automaticamente)"""
        if cliente.id:
            return self.atualizar(cliente)
        return self.criar(cliente)