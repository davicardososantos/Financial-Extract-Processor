from datetime import datetime
from sqlalchemy.orm import Session, joinedload
from uuid import UUID
from typing import Optional, List
from decimal import Decimal

from app.domain.entities.cartao_credito import CartaoCredito
from app.domain.entities.conta import Conta
from app.domain.entities.cliente import Cliente
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository as CartaoCreditoRepositoryInterface
from app.infrastructure.models.cartao_credito import CartaoCreditoORM
from app.infrastructure.models.conta import ContaORM
from app.infrastructure.models.cliente import ClienteORM
from app.infrastructure.repository.base_repository import BaseRepository

class CartaoCreditoRepositoryImpl(BaseRepository[CartaoCreditoORM, CartaoCredito], CartaoCreditoRepositoryInterface):
    def __init__(self, db: Session):
        super().__init__(db, CartaoCreditoORM)
    
    def obter_por_id_completo(self, cartao_id: UUID) -> Optional[CartaoCredito]:
        """Busca cartão com conta e cliente carregados via relationship"""
        cartao_orm = self.db.query(CartaoCreditoORM).options(
            joinedload(CartaoCreditoORM.conta),
            joinedload(CartaoCreditoORM.cliente)
        ).filter(
            CartaoCreditoORM.id == cartao_id,
            CartaoCreditoORM.deletado_em.is_(None)
        ).first()
        
        return self._to_entity(cartao_orm) if cartao_orm else None
    
    def obter_por_cliente(self, cliente_id: UUID) -> List[CartaoCredito]:
        """Obtém cartões de crédito de um cliente com todos os relacionamentos"""
        cliente_orm = self.db.query(ClienteORM).options(
            joinedload(ClienteORM.cartoes_credito).joinedload(CartaoCreditoORM.conta)
        ).filter(
            ClienteORM.id == cliente_id,
            ClienteORM.deletado_em.is_(None)
        ).first()
        
        if cliente_orm and cliente_orm.cartoes_credito:
            cartoes_nao_deletados = [
                cartao for cartao in cliente_orm.cartoes_credito 
                if cartao.deletado_em is None
            ]
            return [self._to_entity(cartao) for cartao in cartoes_nao_deletados]
        
        return []
    
    def obter_por_conta(self, conta_id: UUID) -> List[CartaoCredito]:
        """Obtém cartões de crédito de uma conta com cliente carregado"""
        conta_orm = self.db.query(ContaORM).options(
            joinedload(ContaORM.cartoes_credito).joinedload(CartaoCreditoORM.cliente)
        ).filter(
            ContaORM.id == conta_id,
            ContaORM.deletado_em.is_(None)
        ).first()
        
        if conta_orm and conta_orm.cartoes_credito:
            cartoes_nao_deletados = [
                cartao for cartao in conta_orm.cartoes_credito 
                if cartao.deletado_em is None
            ]
            return [self._to_entity(cartao) for cartao in cartoes_nao_deletados]
        
        return []
    
    def obter_por_ultimos_digitos(self, ultimos_digitos: str) -> Optional[CartaoCredito]:
        """Busca cartão pelos últimos 4 dígitos"""
        cartao_orm = self.db.query(CartaoCreditoORM).options(
            joinedload(CartaoCreditoORM.conta),
            joinedload(CartaoCreditoORM.cliente)
        ).filter(
            CartaoCreditoORM.ultimos_digitos == ultimos_digitos,
            CartaoCreditoORM.deletado_em.is_(None)
        ).first()
        
        return self._to_entity(cartao_orm) if cartao_orm else None
    
    def listar_todos(self) -> List[CartaoCredito]:
        """Lista todos os cartões não deletados com relacionamentos"""
        cartoes_orm = self.db.query(CartaoCreditoORM).options(
            joinedload(CartaoCreditoORM.conta),
            joinedload(CartaoCreditoORM.cliente)
        ).filter(
            CartaoCreditoORM.deletado_em.is_(None)
        ).all()
        
        return [self._to_entity(cartao) for cartao in cartoes_orm]
    
    def atualizar_gasto(self, cartao_id: UUID, novo_gasto: Decimal) -> CartaoCredito:
        """Atualiza o gasto atual e recalcula o limite disponível"""
        cartao_orm = self.db.query(CartaoCreditoORM).filter(
            CartaoCreditoORM.id == cartao_id,
            CartaoCreditoORM.deletado_em.is_(None)
        ).first()
        
        if not cartao_orm:
            raise ValueError("Cartão de crédito não encontrado")
        
        cartao_orm.gasto_atual = novo_gasto
        cartao_orm.limite_disponivel = cartao_orm.limite_total - novo_gasto
        cartao_orm.alterado_em = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(cartao_orm)
        
        return self._to_entity(cartao_orm)
    
    def _to_entity(self, model: CartaoCreditoORM) -> CartaoCredito:
        """Converte ORM para Entity com relationships"""
        return CartaoCredito(
            id=model.id,
            limite_total=model.limite_total,
            limite_disponivel=model.limite_disponivel,
            gasto_atual=model.gasto_atual,
            fechamento_fatura=model.fechamento_fatura,
            vencimento_fatura=model.vencimento_fatura,
            ultimos_digitos=model.ultimos_digitos,
            id_conta=model.id_conta,        
            id_cliente=model.id_cliente,    
            criado_em=model.criado_em,
            alterado_em=model.alterado_em,
            deletado_em=model.deletado_em
        )
    
    def _to_model(self, entity: CartaoCredito) -> CartaoCreditoORM:
        """Converte Entity para ORM"""
        return CartaoCreditoORM(
            id=entity.id,
            limite_total=entity.limite_total,
            limite_disponivel=entity.limite_disponivel,
            gasto_atual=entity.gasto_atual,
            fechamento_fatura=entity.fechamento_fatura,
            vencimento_fatura=entity.vencimento_fatura,
            ultimos_digitos=entity.ultimos_digitos,
            id_conta=entity.id_conta,
            id_cliente=entity.id_cliente,
            criado_em=entity.criado_em,
            alterado_em=entity.alterado_em,
            deletado_em=entity.deletado_em
        )