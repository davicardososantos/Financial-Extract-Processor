from sqlalchemy.orm import Session, joinedload
from uuid import UUID
from typing import Optional, List

from app.domain.entities.conta import Conta
from app.domain.repository.conta_repository import ContaRepository as ContaRepositoryInterface
from app.infrastructure.models.conta import ContaORM
from app.infrastructure.repository.base_repository import BaseRepository

class ContaRepositoryImpl(BaseRepository[ContaORM, Conta], ContaRepositoryInterface):
    def __init__(self, db: Session):
        super().__init__(db, ContaORM)
    
    def obter_por_cliente(self, cliente_id: UUID) -> List[Conta]:
        """Obtém contas com dados do cliente via join"""
        contas_orm = self.db.query(ContaORM).options(
            joinedload(ContaORM.cliente)  
        ).filter(
            ContaORM.id_cliente == cliente_id,
            ContaORM.deletado_em.is_(None)
        ).all()
        
        return [self._to_entity(conta) for conta in contas_orm]
    
    def obter_por_instituicao(self, instituicao: str) -> List[Conta]:
        """Obtém contas por instituição financeira"""
        contas_orm = self.db.query(ContaORM).filter(
            ContaORM.instituicao.ilike(f"%{instituicao}%"),
            ContaORM.deletado_em.is_(None)
        ).all()
        return [self._to_entity(conta) for conta in contas_orm]
    
    def _to_entity(self, model: ContaORM) -> Conta:
        """Converte ORM para Entity"""
        return Conta(
            id=model.id,
            nome=model.nome,
            instituicao=model.instituicao,
            id_cliente=model.id_cliente,
            criado_em=model.criado_em,
            alterado_em=model.alterado_em,
            deletado_em=model.deletado_em
        )
    
    def _to_model(self, entity: Conta) -> ContaORM:
        """Converte Entity para ORM"""
        return ContaORM(
            id=entity.id,
            nome=entity.nome,
            instituicao=entity.instituicao,
            id_cliente=entity.id_cliente,
            criado_em=entity.criado_em,
            alterado_em=entity.alterado_em,
            deletado_em=entity.deletado_em
        )