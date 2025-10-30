from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base


class BoletoORM(Base):
    __tablename__ = "boletos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_transacao = Column(UUID(as_uuid=True), ForeignKey('transacoes.id'), nullable=True)  # Pode ser null
    valor = Column(Numeric(10, 2), nullable=False)  # 99999999.99
    data_vencimento = Column(Date, nullable=False)
    codigo_barras = Column(String(44), nullable=True)  # Código de barras
    linha_digitavel = Column(String(48), nullable=True)  # Linha digitável
    beneficiario = Column(String(100), nullable=True)  # Nome do beneficiário
    pagador = Column(String(100), nullable=True)  # Nome do pagador
    situacao = Column(String(20), default='aberto')  # "aberto", "pago", "vencido", "cancelado"
    data_pagamento = Column(DateTime, nullable=True)  # Data quando foi pago
    nosso_numero = Column(String(20), nullable=True)  # Nosso número
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)