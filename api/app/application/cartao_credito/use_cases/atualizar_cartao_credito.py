from uuid import UUID
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository
from app.domain.entities.cartao_credito import CartaoCredito

class AtualizarCartaoCreditoUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self, cartao_id: UUID, dados) -> CartaoCredito:
        cartao = self.repositorio.obter_por_id(cartao_id)
        if not cartao:
            raise ValueError("Cartão de crédito não encontrado")

        # Atualiza apenas os campos fornecidos
        if dados.limite_total:
            cartao.limite_total = dados.limite_total
            # Recalcula limite disponível se limite total mudou
            cartao.limite_disponivel = cartao.limite_total - cartao.gasto_atual
        
        if dados.fechamento_fatura:
            if dados.fechamento_fatura > 31 or dados.fechamento_fatura < 1:
                raise ValueError("Dia de fechamento deve ser entre 1 e 28")
            cartao.fechamento_fatura = dados.fechamento_fatura
        
        if dados.vencimento_fatura:
            if dados.vencimento_fatura > 31 or dados.vencimento_fatura < 1:
                raise ValueError("Dia de vencimento deve ser entre 1 e 28")
            cartao.vencimento_fatura = dados.vencimento_fatura
        
        if dados.ultimos_digitos is not None:
            cartao.ultimos_digitos = dados.ultimos_digitos

        return self.repositorio.salvar(cartao)