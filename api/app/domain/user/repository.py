from abc import ABC, abstractmethod
from .entities import Usuario

class UsuarioRepository(ABC):
    @abstractmethod
    def salvar(self, usuario: Usuario) -> Usuario:
        pass

    @abstractmethod
    def buscar_por_email(self, email: str) -> Usuario | None:
        pass
    
    @abstractmethod
    def listar_todos(self) -> list[Usuario]:
        pass