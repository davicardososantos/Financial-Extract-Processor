from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from jose import jwt, JWTError
import bcrypt


# Configurações do JWT
SECRET_KEY = "sua_chave_secreta_super_segura"  # idealmente, coloque isso em variáveis de ambiente
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def criar_token(dados: dict, expira_em: timedelta | None = None):
    to_encode = dados.copy()
    expire = datetime.utcnow() + (expira_em or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def gerar_hash_senha(senha: str) -> str:
    # Converte para bytes e trunca se necessário
    senha_bytes = senha.encode('utf-8')
    if len(senha_bytes) > 72:
        senha_bytes = senha_bytes[:72]
    
    hashed = bcrypt.hashpw(senha_bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

def verificar_senha(senha: str, senha_hash: str) -> bool:
    senha_bytes = senha.encode('utf-8')
    if len(senha_bytes) > 72:
        senha_bytes = senha_bytes[:72]
    
    hash_bytes = senha_hash.encode('utf-8')
    return bcrypt.checkpw(senha_bytes, hash_bytes)

def verificar_token(token: str) -> dict | None:
    """
    Verifica se um token JWT é válido e retorna o payload
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None