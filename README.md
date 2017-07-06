# Guia de início rápido

### Sciensa FaleMais
Este é um exemplo de uma calculadora de tarifas telefonicas.

### Estrutura

    .
    ├── api
    │   ├── test
    │   │   ├── api.js
    │   └── api.js
    │── app
    │   ├── client
    │   │   ├── css
    │   │   │   └── style.css
    │   │   ├── scripts
    │   │   │   └── scripts.js
    |   │   ├── test
    │   │   │   ├── app.js
    │   ├── server
    └─  └─  └─  app.js


**1 - API (Rest)**
>**Responsável por:**<br />
>Fazer os calculos das tarifas<br />

**2 - APP (Aplicação Web)**
>**Responsável por:**<br />
>Consumir a API<br />
>Interface para utilizar a calculadora.

### Tecnologias ultilizadas
Como linguagem de programção temos o **node.js**.<br />
Na interface do app, temos **html**, **css**, **javascript**, **jquery**, **bootstrap**.<br />
Nos testes atomatizados, uso **mocha** e **chai**.<br />
Para rodar o app, rodar a API e rodar os testes, temos o **gulp**.<br />

### Passos para executar o projeto

Baixar o projeto:
```
 git clone git@github.com:Geander/sciensa-falemais.git
```

Entrar no projeto:

```
 cd sciensa-falemais/
```

Instalar as dependências usando o npm:
```
 npm install
```

Para rodar os testes:
(também passa o lint)
```
 npm run gulp test
```

Para rodar o Projeto:
(o app vai abrir automaticamente no seu navegador padrão)
```
 npm run gulp serve
```

#### Observações:
>A Calculadora e a Api, rodam nas portas 3000 e 3001 respectivamente, verifique se essas portas não estão em uso antes de rodar a aplicação.

>É necessário internet para baixar as dependências e os arquivos estáticos das CDNs.

>Url da Api:<br />
>http://localhost:3001

>Url da Calculadora:<br />
>http://localhost:3000/calc <br />

<br />
#### Testar API pelo Postman
(Seguindo o padrão de API Rest)<br />

status da api, método **GET**<br />
http://localhost:3001/health/<br />

enviar parametros para calculo, método **GET**,<br /> parametros: {"from":"11","to":"16","minutes":"20","plan":"1"}<br />
http://localhost:3001/calc<br />

<br />
#### Tasks adicionais
Passar o lint:
```
 npm run gulp lint
```

Rodar só o APP:

```
 npm run gulp run-app
```

Rodar só a API:
```
 npm run gulp run-api
```

#### Próximas melhorias
- Coverage.
- Testes com mais de 90% de cobertura.
- Melhorar front-end, talves colocar reactjs ou angularjs.
- Ultilização de scss.
- Gulp Task de build, com Webpack para mimificar css, js, html e disponibilizar na pasta dist.
- Ofuscar js.
- Implementar melhorias de segurança no javascript e nodejs.
- Criptografar a troca de mensagens.
- Colocar planos e valores no BD.
- Parte admninistrativa, para gerenciar os planos e valores.
- Arrumar deprecated dependencies dos pacotes npm.
- Testes para html (DOM).
- Ci Buil no Jenkins.
- Colocar na Cloud AWS (vide próximo tópico)

#### Próximas melhorias em Cloud AWS
>AWS lambda para API<br />
>AWS Api Gateway para os endpoits<br />
>AWS S3 para o conteúdo estático<br />
>AWS CloudFront para o conteúdo estático<br />
>AWS Waf para proteger os endpoits<br />
>AWS DynamoDb para guardar as mensagens<br />
