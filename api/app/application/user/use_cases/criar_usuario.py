from app.domain.entities.usuario import Usuario
from app.domain.value_objects.email import Email
from app.domain.repository.usuario import UsuarioRepository
from app.application.user.dto.usuario_input_dto import UsuarioInputDTO
from app.core.security import gerar_hash_senha

class CriarUsuarioUseCase:
    def __init__(self, repositorio: UsuarioRepository):
        self.repositorio = repositorio

    def executar(self, dados: UsuarioInputDTO) -> Usuario:
        email_vo = Email(dados.email)

        if self.repositorio.buscar_por_email(str(email_vo)):
            raise ValueError("Usuário com este e-mail já existe")

        senha_hash = gerar_hash_senha(dados.senha)
        usuario = Usuario(nome=dados.nome, email=str(email_vo), senha_hash=senha_hash)
        
        return self.repositorio.salvar(usuario)
