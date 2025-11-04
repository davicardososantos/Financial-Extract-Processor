class Nome:
    def __init__(self, valor: str):
        valor_limpo = self._limpar_nome(valor)
        
        if not self._eh_valido(valor_limpo):
            raise ValueError("Nome inválido")
            
        self.valor = valor_limpo
    
    def _limpar_nome(self, nome: str) -> str:
        """Remove espaços extras e capitaliza"""
        return ' '.join(nome.strip().split())
    
    def _eh_valido(self, nome: str) -> bool:
        """Valida se o nome é válido"""
        if not nome or len(nome.strip()) == 0:
            return False
            
        if len(nome) < 2:
            return False
            
        if len(nome) > 100:
            return False
            
        # Pode adicionar mais validações se necessário
        return True
    
    def __str__(self) -> str:
        return self.valor
    
    def __eq__(self, other) -> bool:
        if not isinstance(other, Nome):
            return False
        return self.valor == other.valor
    
    def capitalizado(self) -> str:
        """Retorna nome capitalizado"""
        return self.valor.title()