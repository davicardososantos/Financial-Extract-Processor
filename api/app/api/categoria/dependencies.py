from fastapi import Depends
from sqlalchemy.orm import Session
from app.infrastructure.repository.categoria_repository_impl import CategoriaRepositoryImpl
from app.api.usuario.dependencies import get_db 

def get_categoria_repository(db: Session = Depends(get_db)):
    return CategoriaRepositoryImpl(db)