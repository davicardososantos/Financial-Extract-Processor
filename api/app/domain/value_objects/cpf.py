import re

class CPF:
    def __init__(self, valor: str):
        valor_limpo = self._limpar_cpf(valor)
        
        if not self._eh_valido(valor_limpo):
            raise ValueError("CPF inválido")
            
        self.valor = valor_limpo
    
    def _limpar_cpf(self, cpf: str) -> str:
        """Remove caracteres não numéricos"""
        return re.sub(r'[^0-9]', '', cpf)
    
    def _eh_valido(self, cpf: str) -> bool:
        """Validação básica de CPF (pode implementar algoritmo completo depois)"""
        if len(cpf) != 11:
            return False
            
        if cpf in [c * 11 for c in "0123456789"]:  # CPFs com todos dígitos iguais
            return False
            
        # Aqui pode implementar o algoritmo de validação de CPF completo
        return True
    
    def __str__(self) -> str:
        return self.valor
    
    def __eq__(self, other) -> bool:
        if not isinstance(other, CPF):
            return False
        return self.valor == other.valor
    
    def formatado(self) -> str:
        """Retorna CPF formatado: 000.000.000-00"""
        return f"{self.valor[:3]}.{self.valor[3:6]}.{self.valor[6:9]}-{self.valor[9:]}"