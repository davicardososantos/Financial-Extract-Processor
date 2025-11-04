from fastapi import Depends
from sqlalchemy.orm import Session
from app.infrastructure.db.session import SessionLocal
from app.infrastructure.repository.cliente_repository_impl import ClienteRepositoryImpl

from app.api.usuario.dependencies import get_db 

def get_cliente_repository(db: Session = Depends(get_db)):
    return ClienteRepositoryImpl(db)