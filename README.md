### 🧍‍♂️ **Usuario**

| Campo      | Tipo    | Observação |
| ---------- | ------- | ---------- |
| idUsuario  | PK      |            |
| nome       | texto   |            |
| email      | texto   |            |
| senha_hash | texto   |            |
| ativo      | boolean |            |

---

### 👥 **Cliente**

| Campo     | Tipo  | Observação |
| --------- | ----- | ---------- |
| idCliente | PK    |            |
| nome      | texto |            |

---

### 🔗 **UsuarioxCliente**

| Campo     | Tipo         | Observação |
| --------- | ------------ | ---------- |
| idUsuario | FK → Usuario |            |
| idCliente | FK → Cliente |            |

---

### 💰 **Conta**

| Campo       | Tipo         | Observação                                       |
| ----------- | ------------ | ------------------------------------------------ |
| idConta     | PK           |                                                  |
| nome        | texto        |                                                  |
| instituicao | texto        | Banco, fintech, etc                              |
| idCliente   | FK → Cliente |                                                  |
| tipoConta   | texto        | (‘bancaria’, ‘cartao’, ‘investimento’, ‘pontos’) |

---

#### 🏦 **ContaBancaria**

| Campo   | Tipo            | Observação |
| ------- | --------------- | ---------- |
| idConta | PK / FK → Conta |            |
| agencia | texto           |            |
| numero  | texto           |            |
| saldo   | decimal         |            |

#### 💳 **CartaoCredito**

| Campo            | Tipo            | Observação |
| ---------------- | --------------- | ---------- |
| idConta          | PK / FK → Conta |            |
| limiteTotal      | decimal         |            |
| limiteDisponivel | decimal         |            |
| fechamentoFatura | data            |            |
| vencimentoFatura | data            |            |

#### 📈 **ContaInvestimento**

| Campo            | Tipo            | Observação |
| ---------------- | --------------- | ---------- |
| idConta          | PK / FK → Conta |            |
| tipoInvestimento | texto           |            |
| valorAplicado    | decimal         |            |
| rentabilidade    | decimal         |            |

#### 🎁 **ProgramaPontos**

| Campo        | Tipo            | Observação         |
| ------------ | --------------- | ------------------ |
| idConta      | PK / FK → Conta |                    |
| nomePrograma | texto           | Ex: Livelo, Smiles |
| saldo        | decimal         |                    |

---

### 🗂️ **Categoria**

| Campo       | Tipo  | Observação             |
| ----------- | ----- | ---------------------- |
| idCategoria | PK    |                        |
| nome        | texto | Ex: Comida, Transporte |
| descricao   | texto |                        |
| cor         | texto |                        |

---

### 💸 **Transacao**

| Campo         | Tipo           | Observação                                   |
| ------------- | -------------- | -------------------------------------------- |
| idTransacao   | PK             |                                              |
| descricao     | texto          |                                              |
| valor         | decimal        |                                              |
| dataTransacao | data           |                                              |
| tipoTransacao | texto          | (‘Receita’, ‘Despesa’, ‘Transferencia’)      |
| meioPagamento | texto          | (‘Pix’, ‘Cartão Crédito’, ‘VA’, ‘Boleto’...) |
| status        | texto          | (‘Pago’, ‘Pendente’, ‘Cancelado’)            |
| idConta       | FK → Conta     |                                              |
| idCliente     | FK → Cliente   |                                              |
| idCategoria   | FK → Categoria |                                              |

---

### 📆 **Parcela**

| Campo         | Tipo           | Observação           |
| ------------- | -------------- | -------------------- |
| idParcela     | PK             |                      |
| numero        | inteiro        |                      |
| valor         | decimal        |                      |
| vencimento    | data           |                      |
| dataPagamento | data           | opcional             |
| status        | texto          | (‘Pendente’, ‘Pago’) |
| idTransacao   | FK → Transacao |                      |

---

### 🧾 **ContaPagarReceber**

*(Nova tabela para o controle das contas mensais a pagar/receber — substitui a ideia de “Boletos”)*

| Campo               | Tipo           | Observação                                    |
| ------------------- | -------------- | --------------------------------------------- |
| idContaPagarReceber | PK             |                                               |
| descricao           | texto          |                                               |
| valor               | decimal        |                                               |
| tipo                | texto          | (‘Pagar’, ‘Receber’)                          |
| dataVencimento      | data           |                                               |
| dataLembrete        | data           | opcional, para alertar antes do vencimento    |
| status              | texto          | (‘Pendente’, ‘Pago’, ‘Atrasado’, ‘Cancelado’) |
| idCliente           | FK → Cliente   |                                               |
| idConta             | FK → Conta     |                                               |
| idCategoria         | FK → Categoria |                                               |
| idTransacao         | FK → Transacao | opcional, se já foi pago                      |

---

### 💳 **Divida**

| Campo           | Tipo         | Observação                          |
| --------------- | ------------ | ----------------------------------- |
| idDivida        | PK           |                                     |
| credor          | texto        |                                     |
| valorOriginal   | decimal      |                                     |
| valorAtual      | decimal      |                                     |
| dataContratacao | data         |                                     |
| juros           | decimal      |                                     |
| status          | texto        | (‘Ativa’, ‘Quitada’, ‘Renegociada’) |
| idCliente       | FK → Cliente |                                     |

---
