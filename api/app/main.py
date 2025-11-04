from fastapi import FastAPI
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from app.api.auth.router import router as auth_router
from app.api.usuario.router import router as usuario_router
from app.api.cliente.router import router as cliente_router
from app.api.conta.router import router as conta_router
from app.api.categoria.router import router as categoria_router
from app.api.cartao_credito.router import router as cartao_credito_router
from app.infrastructure.db.base import Base
from app.infrastructure.db.session import engine
from app.infrastructure.models import *

security = HTTPBearer()

app = FastAPI(
     title="Finanças pessoais",
     description="API para controle de finanças pessoais",
     version="1.0.0",     
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # URL do frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"],  # Permite todos os headers
)

# Cria as tabelas
Base.metadata.create_all(bind=engine)

# Registra rotas
app.include_router(usuario_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(cliente_router, prefix="/api")
app.include_router(conta_router, prefix="/api")
app.include_router(categoria_router, prefix="/api")
app.include_router(cartao_credito_router, prefix="/api")

@app.get("/", include_in_schema=False)
def root():
    return {"message": "API funcionando!"}