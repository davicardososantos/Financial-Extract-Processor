from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base


class DividaORM(Base):
    __tablename__ = "dividas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    credor = Column(String(100), nullable=False)  # Nome do credor
    valor_original = Column(Numeric(10, 2), nullable=False)  # 99999999.99
    valor_atual = Column(Numeric(10, 2), nullable=False)  # 99999999.99
    data_contratacao = Column(Date, nullable=False)
    juros = Column(Numeric(5, 4), nullable=False)  # 0.1500 (15.00%)
    tipo_juros = Column(String(20), default='composto')  # "composto", "simples"
    vencimento = Column(Date, nullable=True)  # Data de vencimento
    parcelas = Column(Numeric(3, 0), nullable=True)  # Número de parcelas
    situacao = Column(String(20), default='ativa')  # "ativa", "quitada", "negociada"
    descricao = Column(String(255), nullable=True)  # Descrição adicional
    id_conta = Column(UUID(as_uuid=True), ForeignKey('contas.id'), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)