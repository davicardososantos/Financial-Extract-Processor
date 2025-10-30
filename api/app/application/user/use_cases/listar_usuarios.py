from app.domain.repository.usuario import UsuarioRepository

class ListarUsuariosUseCase:
    def __init__(self, repositorio: UsuarioRepository):
        self.repositorio = repositorio

    def executar(self):
        return self.repositorio.listar_todos()