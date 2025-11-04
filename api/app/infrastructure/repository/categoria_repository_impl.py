from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List

from app.domain.entities.categoria import Categoria
from app.domain.repository.categoria_repository import CategoriaRepository as CategoriaRepositoryInterface
from app.infrastructure.models.categoria import CategoriaORM
from app.infrastructure.repository.base_repository import BaseRepository

class CategoriaRepositoryImpl(BaseRepository[CategoriaORM, Categoria], CategoriaRepositoryInterface):
    def __init__(self, db: Session):
        super().__init__(db, CategoriaORM)
    
    def obter_por_nome(self, nome: str) -> Optional[Categoria]:
        """Obtém categoria por nome (case insensitive)"""
        categoria_orm = self.db.query(CategoriaORM).filter(
            CategoriaORM.nome.ilike(nome),
            CategoriaORM.deletado_em.is_(None)
        ).first()
        return self._to_entity(categoria_orm) if categoria_orm else None
    
    def _to_entity(self, model: CategoriaORM) -> Categoria:
        """Converte ORM para Entity"""
        return Categoria(
            id=model.id,
            nome=model.nome,
            descricao=model.descricao,
            cor=model.cor,
            icone=getattr(model, 'icone', '📁'),  
            criado_em=model.criado_em,
            alterado_em=model.alterado_em,
            deletado_em=model.deletado_em
        )
    
    def _to_model(self, entity: Categoria) -> CategoriaORM:
        """Converte Entity para ORM"""
        return CategoriaORM(
            id=entity.id,
            nome=entity.nome,
            descricao=entity.descricao,
            cor=entity.cor,
            icone=getattr(entity, 'icone', '📁'),  
            criado_em=entity.criado_em,
            alterado_em=entity.alterado_em,
            deletado_em=entity.deletado_em
        )