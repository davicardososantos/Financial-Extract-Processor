from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base


class CartaoCreditoORM(Base):
    __tablename__ = "cartoes_credito"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    limite_total = Column(Numeric(10, 2), nullable=False)  # 99999999.99
    limite_disponivel = Column(Numeric(10, 2), nullable=False)  # 99999999.99
    fechamento_fatura = Column(Date, nullable=False)  # Dia do fechamento (1-31)
    vencimento_fatura = Column(Date, nullable=False)  # Dia do vencimento (1-31)
    ultimos_digitos = Column(String(4), nullable=True)  # "1234"
    id_conta = Column(UUID(as_uuid=True), ForeignKey('contas.id'), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)