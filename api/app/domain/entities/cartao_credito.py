from datetime import datetime, date
from uuid import UUID, uuid4
from typing import Optional
from decimal import Decimal

class CartaoCredito:
    def __init__(
        self,
        limite_total: Decimal,
        limite_disponivel: Decimal,
        fechamento_fatura: int,
        vencimento_fatura: int,
        id_conta: UUID,
        id_cliente: UUID,
        gasto_atual: Decimal = Decimal("0"),  
        ultimos_digitos: Optional[str] = None,
        id: Optional[UUID] = None,
        criado_em: Optional[datetime] = None,
        alterado_em: Optional[datetime] = None,
        deletado_em: Optional[datetime] = None
    ):
        self.id = id or uuid4()
        self.limite_total = limite_total
        self.limite_disponivel = limite_disponivel
        self.gasto_atual = gasto_atual  
        self.fechamento_fatura = fechamento_fatura
        self.vencimento_fatura = vencimento_fatura
        self.ultimos_digitos = ultimos_digitos
        self.id_conta = id_conta
        self.id_cliente = id_cliente  
        self.criado_em = criado_em or datetime.utcnow()
        self.alterado_em = alterado_em or datetime.utcnow()
        self.deletado_em = deletado_em
    
    def soft_delete(self):
        """Marca o cartão como deletado (soft delete)"""
        self.deletado_em = datetime.utcnow()
        self.alterado_em = datetime.utcnow()
    
    def calcular_limite_disponivel(self) -> Decimal:
        """Calcula o limite disponível automaticamente"""
        return self.limite_total - self.gasto_atual
    
    def atualizar_gasto(self, novo_gasto: Decimal):
        """Atualiza o gasto e recalcula o limite disponível"""
        self.gasto_atual = novo_gasto
        self.limite_disponivel = self.calcular_limite_disponivel()
        self.alterado_em = datetime.utcnow()