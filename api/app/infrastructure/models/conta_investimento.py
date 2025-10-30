from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base


class ContaInvestimentoORM(Base):
    __tablename__ = "contas_investimento"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    tipo_investimento = Column(String(50), nullable=False)  # "CDB", "Ações", "FII", "Tesouro Direto", etc.
    valor_aplicado = Column(Numeric(12, 4), nullable=False)  # 99999999.9999
    rentabilidade = Column(Numeric(5, 4), nullable=False)  # 0.1500 (15.00%)
    data_aplicacao = Column(DateTime, nullable=True)  # Data quando o investimento foi feito
    vencimento = Column(DateTime, nullable=True)  # Para investimentos com prazo
    id_conta = Column(UUID(as_uuid=True), ForeignKey('contas.id'), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)