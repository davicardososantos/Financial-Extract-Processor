from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional

from app.domain.entities.cliente import Cliente
from app.domain.repository.cliente_repository import ClienteRepository as ClienteRepositoryInterface
from app.infrastructure.models.cliente import ClienteORM
from app.infrastructure.repository.base_repository import BaseRepository

class ClienteRepositoryImpl(BaseRepository[ClienteORM, Cliente], ClienteRepositoryInterface):
    def __init__(self, db: Session):
        super().__init__(db, ClienteORM)
    
    def obter_por_email(self, email: str) -> Optional[Cliente]:
        cliente_orm = self.db.query(ClienteORM).filter_by(email=email).first()
        return self._to_entity(cliente_orm) if cliente_orm else None
    
    def obter_por_cpf(self, cpf: str) -> Optional[Cliente]:
        cliente_orm = self.db.query(ClienteORM).filter_by(cpf=cpf).first()
        return self._to_entity(cliente_orm) if cliente_orm else None
    
    # Herda automaticamente: criar(), atualizar(), salvar(), excluir()
    
    def _to_entity(self, model: ClienteORM) -> Cliente:
        return Cliente(
            id=model.id,
            nome=model.nome,
            email=model.email,
            cpf=model.cpf,
            data_nascimento=model.data_nascimento,
            telefone=model.telefone,
            criado_em=model.criado_em,
            alterado_em=model.alterado_em,
            deletado_em=model.deletado_em
        )
    
    def _to_model(self, entity: Cliente) -> ClienteORM:
        return ClienteORM(
            id=entity.id,
            nome=entity.nome,
            email=entity.email,
            cpf=entity.cpf,
            data_nascimento=entity.data_nascimento,
            telefone=entity.telefone,
            criado_em=entity.criado_em,
            alterado_em=entity.alterado_em,
            deletado_em=entity.deletado_em
        )