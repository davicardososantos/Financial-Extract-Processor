from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base


class ContaBancariaORM(Base):
    __tablename__ = "contas_bancarias"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agencia = Column(String(20), nullable=False)
    numero = Column(String(20), nullable=False)
    saldo = Column(Numeric(10, 2), default=0.0, nullable=False)  # 99999999.99
    id_conta = Column(UUID(as_uuid=True), ForeignKey('contas.id'), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)