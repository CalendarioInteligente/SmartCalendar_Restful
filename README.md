# Restful API do SmartCalendar

Para inicializar o servidor é importante que primeiro você execute o template.bat para iniciar as variáveis de ambiente,
em seguida na pasta 'src/' execute o comando "node index.js"

## Como usar a API (Com exemplos)

### Usuario

ATENÇÃO: "data" pode ser um valor nulo ao invés de um objeto.

Os valores `telefone`, `nome` e `sobrenome` são opcionais e podem ser nulos
Mas caso você não passe um nome "User" será usado, e o sobrenome será uma string vazia.

`POST "/api/signup/"`

```json
{
  "email": "email@teste.com",
  "senha": "password",
  "telefone:": "19000000000",
  "nome": "João",
  "sobrenome": "da Silva"
}
```

RESPONSE

```json
{
  "status": "CRE",
  "message": "Usuario criado com sucesso!",
  "data": {
    "session": "session-token",
    "userId": 1
  }
}
```

`POST "/api/login/"`

```json
{
  "email": "email@teste.com",
  "senha": "password"
}
```

RESPONSE

```json
{
  "status": "OK",
  "message": "Logado com sucesso!",
  "data": {
    "session": "session-token",
    "userId": 1
  }
}
```

`GET "/api/oauth"`

```json
{
  "session": "session-id",
  "userId": 1
}
```

`POST "/api/logout"`

```json
{
  "status": "OK",
  "message": "Você foi desconectado."
}
```

`POST "/api/agendamentos"`

```json
{
  "titulo": "O Dia",
  "descricao": "Festa",
  "data": "2012-04-23T18:25:43.000Z"
}
```

RESPONSE

```json
{
  "status": "OK",
  "message": "Seu agendamento foi armazenado com sucesso!",
  "data": null
}
```

`GET "/api/user/:id/agendamentos"`

RESPONSE

```json
{
  "status": "OK",
  "message": "Os agendamentos foram encontrados!",
  "data": [
    {
      "titulo": "titulo",
      "descricao": "descricao",
      "data": "2012-04-23T18:25:43.000Z",
      "id": 1
    }
  ]
}
```

`DELETE "/api/agendamentos/:id"`

RESPONSE

```json
{
  "status": "OK",
  "message": "O evento foi deletado com sucesso!",
  "data": null
}
```

`GET "/api/agendamentos/:id"`

RESPONSE

```json
{
  "status": "OK",
  "message": "O evento foi encontrado!",
  "data": {
    "evento": {
      "titulo": "Festa",
      "descricao": "Casa do João",
      "data": "2012-04-23T18:25:43.000Z",
      "id": 1
    }
  }
}
```

`PUT "/api/agendamentos/:id"`

```json
{
  "titulo": "O Dia",
  "descricao": "Festa",
  "data": "2012-04-23T18:25:43.000Z"
}
```

RESPONSE

```json
{
  "status": "OK",
  "message": "Seu agendamento foi alterado com sucesso!"
}
```
