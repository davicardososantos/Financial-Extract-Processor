from abc import ABC, abstractmethod
from uuid import UUID
from typing import Optional, List
from decimal import Decimal
from app.domain.entities.cartao_credito import CartaoCredito

class CartaoCreditoRepository(ABC):
    @abstractmethod
    def obter_por_id(self, id: UUID) -> Optional[CartaoCredito]:
        pass
    
    @abstractmethod
    def obter_por_id_completo(self, cartao_id: UUID) -> Optional[CartaoCredito]:
        pass
    
    @abstractmethod
    def obter_por_cliente(self, cliente_id: UUID) -> List[CartaoCredito]:
        pass
    
    @abstractmethod
    def obter_por_conta(self, conta_id: UUID) -> List[CartaoCredito]:
        pass
    
    @abstractmethod
    def obter_por_ultimos_digitos(self, ultimos_digitos: str) -> Optional[CartaoCredito]:
        pass
    
    @abstractmethod
    def listar_todos(self) -> List[CartaoCredito]:
        pass
    
    @abstractmethod
    def criar(self, cartao: CartaoCredito) -> CartaoCredito:
        pass
    
    @abstractmethod
    def atualizar(self, cartao: CartaoCredito) -> CartaoCredito:
        pass
    
    def salvar(self, cartao: CartaoCredito) -> CartaoCredito:
        """Salva o cartão (cria ou atualiza automaticamente)"""
        if cartao.id:
            return self.atualizar(cartao)
        return self.criar(cartao)
    
    @abstractmethod
    def excluir(self, id: UUID) -> bool:
        pass
    
    @abstractmethod
    def atualizar_gasto(self, cartao_id: UUID, novo_gasto: Decimal) -> CartaoCredito:
        pass