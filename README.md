# Desafio Técnico Back-end

- Projeto desafio feito com base nas instruções do repositório original: https://github.com/linkiodental/order-management-challenge

# Tecnologias utilizadas

- Express.js
- TypeScript & Node.js
- Mongoose & MongoDB
- JsonWebToken
- Bcrypt

# Como usar

1. Clone o repositório:

```
git clone https://github.com/kev1n999/order-management-challenge
```

2. Entre na pasta do projeto:

```
cd order/management-challenge
```

3. Instale as dependências:
```
npm install
``` 

3. Crie um .env na raiz do projeto e configure as variáveis do ambiente:

```
SERVER_PORT=4000
MONGO_URI=mongo-uri
JWT_SECRET=jwt-secret
```

4. Rode o servidor pelo comando: 
```
npm run server
``` 

## Rotas disponíveis

- **POST** `/api/auth/register`  
  Para registrar um novo usuário

- **POST** `/api/auth/login`  
  Para fazer login

- **GET / POST** `/api/orders/`  
  Para criar ou listar pedidos

- **PATCH** `/api/orders/:id/advance`  
  Para avançar estados do pedido a partir do ID
