import pytest
import os
import sys
from pathlib import Path

def test_python_path_configuration():
    """Testa se o Python path está configurado corretamente"""
    current_dir = Path(__file__).parent
    parent_dir = current_dir.parent
    app_dir = parent_dir / "app"
    
    assert str(parent_dir) in sys.path, "Diretório raiz deveria estar no Python path"
    assert app_dir.exists(), "Diretório app deveria existir"
    print(f"✅ Python path configurado: {parent_dir}")

def test_app_import_and_structure():
    """Testa se o app FastAPI pode ser importado e tem a estrutura correta"""
    try:
        from app.main import app
        assert app is not None
        assert hasattr(app, 'title'), "App deveria ter título"
        assert app.title == "Finanças pessoais"
        assert hasattr(app, 'version')
        assert app.version == "1.0.0"
        print("✅ App FastAPI importado e estruturado corretamente")
    except ImportError as e:
        pytest.fail(f"Falha ao importar app: {e}")

def test_database_base_import():
    """Testa se a Base do SQLAlchemy pode ser importada"""
    try:
        from app.infrastructure.db.base import Base
        assert Base is not None
        assert hasattr(Base, 'metadata')
        print("✅ Base do SQLAlchemy importada")
    except ImportError as e:
        pytest.fail(f"Falha ao importar Base: {e}")

def test_database_session_import():
    """Testa se a sessão do banco pode ser importada"""
    try:
        from app.infrastructure.db.session import engine, SessionLocal
        assert engine is not None
        assert SessionLocal is not None
        print("✅ Engine e SessionLocal importados")
    except ImportError as e:
        pytest.fail(f"Falha ao importar session: {e}")

def test_models_import():
    """Testa se os modelos podem ser importados"""
    try:
        from app.infrastructure.models.usuario import UsuarioORM
        assert UsuarioORM is not None
        assert UsuarioORM.__tablename__ == "usuarios"
        print("✅ Modelo UsuarioORM importado")
    except ImportError as e:
        pytest.fail(f"Falha ao importar modelos: {e}")

def test_routers_import():
    """Testa se os routers podem ser importados"""
    try:
        from app.api.usuario.router import router as usuario_router
        from app.api.auth.router import router as auth_router
        assert usuario_router is not None
        assert auth_router is not None
        print("✅ Routers importados")
    except ImportError as e:
        pytest.fail(f"Falha ao importar routers: {e}")