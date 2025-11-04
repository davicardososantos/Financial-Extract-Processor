from decimal import Decimal
from app.domain.entities.cartao_credito import CartaoCredito
from app.domain.repository.cartao_credito_repository import CartaoCreditoRepository
from app.application.cartao_credito.dto.cartao_credito_input_dto import CartaoCreditoInputDTO

class CriarCartaoCreditoUseCase:
    def __init__(self, repositorio: CartaoCreditoRepository):
        self.repositorio = repositorio

    def executar(self, dados: CartaoCreditoInputDTO) -> CartaoCredito:
        # Validações de negócio
        if dados.fechamento_fatura > 31 or dados.fechamento_fatura < 1:
            raise ValueError("Dia de fechamento deve ser entre 1 e 31")

        if dados.vencimento_fatura > 31 or dados.vencimento_fatura < 1:
            raise ValueError("Dia de vencimento deve ser entre 1 e 31")

        # Calcula limite disponível inicial (igual ao limite total)
        limite_disponivel = dados.limite_total
        gasto_atual = Decimal("0")

        cartao = CartaoCredito(
            limite_total=dados.limite_total,
            limite_disponivel=limite_disponivel,
            gasto_atual=gasto_atual,
            fechamento_fatura=dados.fechamento_fatura,
            vencimento_fatura=dados.vencimento_fatura,
            ultimos_digitos=dados.ultimos_digitos,
            id_conta=dados.id_conta,
            id_cliente=dados.id_cliente
        )
        
        return self.repositorio.salvar(cartao)