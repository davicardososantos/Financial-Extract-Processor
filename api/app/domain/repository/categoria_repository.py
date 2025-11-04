from abc import ABC, abstractmethod
from uuid import UUID
from typing import Optional, List
from app.domain.entities.categoria import Categoria

class CategoriaRepository(ABC):
    @abstractmethod
    def obter_por_id(self, id: UUID) -> Optional[Categoria]:
        pass
    
    @abstractmethod
    def obter_por_nome(self, nome: str) -> Optional[Categoria]:
        pass
    
    @abstractmethod
    def listar_todos(self) -> List[Categoria]:
        pass
    
    @abstractmethod
    def criar(self, categoria: Categoria) -> Categoria:
        pass
    
    @abstractmethod
    def atualizar(self, categoria: Categoria) -> Categoria:
        pass
    
    def salvar(self, categoria: Categoria) -> Categoria:
        """Salva a categoria (cria ou atualiza automaticamente)"""
        if categoria.id:
            return self.atualizar(categoria)
        return self.criar(categoria)
    
    @abstractmethod
    def excluir(self, id: UUID) -> bool:
        pass