from fastapi import FastAPI
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.api.auth.auth_router import router as auth_router
from app.api.user.router import router as usuario_router
from app.infrastructure.db.base import Base
from app.infrastructure.db.session import engine

security = HTTPBearer()

app = FastAPI(
     title="Finanças pessoais",
     description="API para controle de finanças pessoais",
     version="1.0.0",     
    swagger_ui_parameters={"defaultModelsExpandDepth": -1}
)

# Cria as tabelas
Base.metadata.create_all(bind=engine)

# Registra rotas
app.include_router(usuario_router, prefix="/api")
app.include_router(auth_router, prefix="/api")

@app.get("/", include_in_schema=False)
def root():
    return {"message": "API funcionando!"}