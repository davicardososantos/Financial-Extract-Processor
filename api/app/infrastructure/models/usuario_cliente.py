from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.infrastructure.db.base import Base


class UsuarioClienteORM(Base):
    __tablename__ = "usuario_cliente"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    id_usuario = Column(UUID(as_uuid=True), ForeignKey('usuarios.id'), nullable=False)
    id_cliente = Column(UUID(as_uuid=True), ForeignKey('clientes.id'), nullable=False)
    criado_em = Column(DateTime, default=datetime.utcnow, nullable=False)
    alterado_em = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletado_em = Column(DateTime, nullable=True)

    # Para garantir que um usuário não seja vinculado ao mesmo cliente múltiplas vezes
    __table_args__ = (
        UniqueConstraint('id_usuario', 'id_cliente', name='uq_usuario_cliente'),
    )