from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base


class ProgramaPontosORM(Base):
    __tablename__ = "programas_pontos"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nome_programa = Column(String(100), nullable=False)  # "Smiles", "Livelo", "Multiplus", etc.
    saldo = Column(Numeric(10, 2), default=0.0, nullable=False)  # 99999999.99
    id_conta = Column(UUID(as_uuid=True), ForeignKey('contas.id'), nullable=False)
    tipo_pontos = Column(String(50), nullable=True)  # "Milhas", "Pontos", "Cashback"
    valor_por_ponto = Column(Numeric(8, 4), nullable=True)  # Valor em reais de cada ponto
    data_expiracao = Column(DateTime, nullable=True)  # Data de expiração dos pontos
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)