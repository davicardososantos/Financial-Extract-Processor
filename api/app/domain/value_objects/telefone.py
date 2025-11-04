import re

class Telefone:
    def __init__(self, valor: str):
        valor_limpo = self._limpar_telefone(valor)
        
        if not self._eh_valido(valor_limpo):
            raise ValueError("Telefone inválido")
            
        self.valor = valor_limpo
    
    def _limpar_telefone(self, telefone: str) -> str:
        """Remove caracteres não numéricos"""
        return re.sub(r'[^0-9]', '', telefone)
    
    def _eh_valido(self, telefone: str) -> bool:
        """Valida formato de telefone brasileiro"""
        if len(telefone) not in [10, 11]:  # Com ou sem 9º dígito
            return False
            
        # Verifica se é um DDD válido (11 a 99)
        ddd = telefone[:2]
        if not ddd.isdigit() or not (11 <= int(ddd) <= 99):
            return False
            
        return True
    
    def __str__(self) -> str:
        return self.valor
    
    def __eq__(self, other) -> bool:
        if not isinstance(other, Telefone):
            return False
        return self.valor == other.valor
    
    def formatado(self) -> str:
        """Retorna telefone formatado: (00) 00000-0000"""
        if len(self.valor) == 11:
            return f"({self.valor[:2]}) {self.valor[2:7]}-{self.valor[7:]}"
        else:
            return f"({self.valor[:2]}) {self.valor[2:6]}-{self.valor[6:]}"