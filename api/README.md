# 📊 Financial Extract Processor

Uma API FastAPI para processamento e controle de extratos bancários, permitindo o gerenciamento financeiro pessoal através da captura de extratos de contas correntes e cartões de crédito.

## 🚀 Funcionalidades

- ✅ **Autenticação JWT** - Sistema seguro de login
- ✅ **Gestão de Usuários** - Cadastro e listagem de usuários
- ✅ **Upload de Extratos** - Processamento de extratos bancários (em desenvolvimento)
- ✅ **API Documentada** - Documentação interativa com Swagger UI
- ✅ **PostgreSQL** - Banco de dados relacional para persistência

## 🛠️ Tecnologias

- **FastAPI** - Framework web moderno
- **PostgreSQL** - Banco de dados
- **SQLAlchemy** - ORM
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **Uvicorn** - Servidor ASGI

## 📋 Pré-requisitos

- Python 3.8+
- PostgreSQL
- pip (gerenciador de pacotes Python)

## ⚡ Como executar

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd fastapi_project
```

### 2. Configure o ambiente virtual
```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate
```

### 3. Instale as dependências
```bash
pip install -r requirements.txt
```

### 4. Configure o banco de dados
Crie um banco PostgreSQL e configure a connection string no arquivo:
```python
# app/infrastructure/db/session.py
DATABASE_URL = "postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### 5. Execute a aplicação
```bash
# Desenvolvimento com reload automático
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 6. Acesse a documentação
Abra o navegador e acesse:
- **Swagger UI**: http://localhost:8000/docs
- **Redoc**: http://localhost:8000/redoc

## 🔐 Endpoints Principais

### Autenticação
- `POST /api/login` - Login e obtenção de token JWT

### Usuários
- `POST /api/usuarios` - Cadastrar novo usuário
- `GET /api/usuarios` - Listar usuários (requer autenticação)

## 📝 Exemplos de Uso

### 1. Cadastrar Usuário
```bash
curl -X POST "http://localhost:8000/api/usuarios" \
     -H "Content-Type: application/json" \
     -d '{
       "nome": "João Silva",
       "email": "joao@email.com",
       "senha": "senha123"
     }'
```

### 2. Fazer Login
```bash
curl -X POST "http://localhost:8000/api/login" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "joao@email.com",
       "senha": "senha123"
     }'
```

### 3. Acessar Endpoints Protegidos
```bash
curl -X GET "http://localhost:8000/api/usuarios" \
     -H "Authorization: Bearer <seu_token_jwt>"
```

## 🗂️ Estrutura do Projeto

```
fastapi_project/
├── app/
│   ├── api/
│   │   ├── auth/          # Rotas de autenticação
│   │   └── user/          # Rotas de usuários
│   ├── application/       # Casos de uso
│   │   └── user/ 
│   │       |── dto/
│   │       └── use_cases/
│   ├── core/
│   ├── domain/           # Entidades e regras de negócio
│   │   └── user/ 
│   ├── infrastructure/   # Banco, repositórios, segurança
│   │   └── db/ 
│   │   └── user/ 
│   └── main.py          # Entry point da aplicação
├── tests/
├── requirements.txt     # Dependências do projeto
└── README.md           # Este arquivo
```

## 🔄 Próximas Funcionalidades

- [ ] Upload de extratos CSV/PDF
- [ ] Processamento automático de transações
- [ ] Categorização de gastos
- [ ] Dashboard com métricas financeiras
- [ ] Relatórios personalizados
- [ ] Integração com bancos via API

## 🐛 Solução de Problemas

### Erro de conexão com o banco
- Verifique se o PostgreSQL está rodando
- Confirme a connection string no `session.py`
- Certifique-se de que o banco existe

### Erro de porta em uso
```bash
# Use uma porta diferente
uvicorn app.main:app --reload --port 8001
```

### Problemas com dependências
```bash
# Reinstale as dependências
pip install --force-reinstall -r requirements.txt
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para o controle financeiro pessoal**


