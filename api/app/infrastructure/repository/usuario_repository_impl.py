from sqlalchemy.orm import Session
from app.domain.entities.usuario import Usuario
from app.domain.repository.usuario_repository import UsuarioRepository as UsuarioRepositoryInterface
from app.infrastructure.models.usuario import UsuarioORM
from app.infrastructure.repository.base_repository import BaseRepository

class UsuarioRepositoryImpl(BaseRepository[UsuarioORM, Usuario], UsuarioRepositoryInterface):
    def __init__(self, db: Session):
        super().__init__(db, UsuarioORM)  # ✅ Herda métodos base
    
    def buscar_por_email(self, email: str) -> Usuario | None:
        usuario_orm = self.db.query(UsuarioORM).filter_by(email=email).first()
        return self._to_entity(usuario_orm) if usuario_orm else None
    
    # ✅ Implementação dos métodos abstratos
    def _to_entity(self, model: UsuarioORM) -> Usuario:
        return Usuario(
            id=model.id,
            nome=model.nome,
            email=model.email,
            senha_hash=model.senha_hash,
            criado_em=model.criado_em
        )
    
    def _to_model(self, entity: Usuario) -> UsuarioORM:
        return UsuarioORM(
            id=entity.id,
            nome=entity.nome,
            email=entity.email,
            senha_hash=entity.senha_hash,
            criado_em=entity.criado_em
        )