from fastapi import Depends
from sqlalchemy.orm import Session
from app.infrastructure.db.session import SessionLocal
from app.infrastructure.repository.conta_repository_impl import ContaRepositoryImpl

from app.api.usuario.dependencies import get_db 

def get_conta_repository(db: Session = Depends(get_db)):
    return ContaRepositoryImpl(db)