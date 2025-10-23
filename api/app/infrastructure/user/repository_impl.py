from sqlalchemy.orm import Session
from app.domain.user.entities import Usuario
from app.domain.user.repository import UsuarioRepository
from app.infrastructure.user.models import UsuarioORM
from app.application.user.dto.usuario_output_dto import UsuarioOutputDTO

class UsuarioRepositoryImpl(UsuarioRepository):
    def __init__(self, db: Session):
        self.db = db

    def salvar(self, usuario: Usuario) -> Usuario:
        usuario_orm = UsuarioORM(
            id=usuario.id,
            nome=usuario.nome,
            email=usuario.email,
            senha_hash=usuario.senha_hash,
            criado_em=usuario.criado_em
        )
        self.db.add(usuario_orm)
        self.db.commit()
        self.db.refresh(usuario_orm)
        return usuario

    
    def buscar_por_email(self, email: str) -> Usuario | None:
        usuario_orm = self.db.query(UsuarioORM).filter_by(email=email).first()
        if usuario_orm:
            return Usuario(
                id=usuario_orm.id,
                nome=usuario_orm.nome,
                email=usuario_orm.email,
                criado_em=usuario_orm.criado_em,
                senha_hash=usuario_orm.senha_hash  # Adicione esse campo na entidade
            )
        return None
    
    def listar_todos(self) -> list[UsuarioOutputDTO]:
        usuarios_orm = self.db.query(UsuarioORM).all()
        return [
            UsuarioOutputDTO(
                id=u.id,
                nome=u.nome,
                email=u.email,
                criado_em=u.criado_em
            )
            for u in usuarios_orm
        ]