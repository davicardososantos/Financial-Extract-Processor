import re

class Email:
    def __init__(self, endereco: str):
        if not self._validar(endereco):
            raise ValueError("Email inválido")
        self.endereco = endereco

    def _validar(self, email: str) -> bool:
        return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

    def __str__(self):
        return self.endereco