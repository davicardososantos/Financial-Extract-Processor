from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Date, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base

class CartaoCreditoORM(Base):
    __tablename__ = "cartoes_credito"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    limite_total = Column(Numeric(10, 2), nullable=False)
    limite_disponivel = Column(Numeric(10, 2), nullable=False)
    gasto_atual = Column(Numeric(10, 2), nullable=False, default=0)
    fechamento_fatura = Column(Integer, nullable=False)
    vencimento_fatura = Column(Integer, nullable=False)
    ultimos_digitos = Column(String(4), nullable=True)
    id_conta = Column(UUID(as_uuid=True), ForeignKey('contas.id'), nullable=False)
    id_cliente = Column(UUID(as_uuid=True), ForeignKey('clientes.id'), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)

    conta = relationship("ContaORM", back_populates="cartoes_credito", lazy="select")
    cliente = relationship("ClienteORM", back_populates="cartoes_credito", lazy="select")