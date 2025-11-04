from fastapi import Depends
from sqlalchemy.orm import Session
from app.infrastructure.repository.cartao_credito_repository_impl import CartaoCreditoRepositoryImpl
from app.api.usuario.dependencies import get_db 

def get_cartao_credito_repository(db: Session = Depends(get_db)):
    return CartaoCreditoRepositoryImpl(db)