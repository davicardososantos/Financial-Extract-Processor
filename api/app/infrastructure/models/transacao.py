from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum

from app.infrastructure.db.base import Base

# Enum para tipos de transação
class TipoTransacaoEnum(enum.Enum):
    RECEITA = "receita"
    DESPESA = "despesa" 
    TRANSFERENCIA = "transferencia"

class TransacaoORM(Base):
    __tablename__ = "transacoes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    descricao = Column(String(200), nullable=False)
    valor = Column(Numeric(10, 2), nullable=False)  # 99999999.99
    id_cliente = Column(UUID(as_uuid=True), ForeignKey('clientes.id'), nullable=False)
    id_conta = Column(UUID(as_uuid=True), ForeignKey('contas.id'), nullable=False)
    id_categoria = Column(UUID(as_uuid=True), ForeignKey('categorias.id'), nullable=False)
    tipo_transacao = Column(Enum(TipoTransacaoEnum), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)