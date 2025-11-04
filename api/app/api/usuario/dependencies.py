from fastapi import Depends
from sqlalchemy.orm import Session
from app.infrastructure.db.session import SessionLocal
from app.infrastructure.repository.usuario_repository_impl import UsuarioRepositoryImpl

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_usuario_repository(db: Session = Depends(get_db)):
    return UsuarioRepositoryImpl(db)