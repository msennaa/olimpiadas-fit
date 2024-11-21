# Boas-vindas ao repositório Olimpíadas Fit!

Com a chegada das olimpíadas fit, fomos designados para construir uma API REST em NodeJS para o COF (Comitê Olímpico Fit), que será responsável por marcar e dizer os vencedores das seguintes modalidades:

Competição de hidratação: maior quantidade em L de água, vence

Competição de yoga: maior tempo fazendo yoga vence

Competição de perda de peso: maior quantidade de calorias perdidas vence

Competição de dardos: maior distância entre os lançamentos vence


---
# Orientações

<details>
  <summary>
    <strong>⌨️ Tecnologias</strong>
  </summary>
  
  - **Typescript**
  
  - **Node**
  
  - **Express**
  
  - **MySql**
  
  - **Sequelize**
  
  - **Chai**
  
  - **Mocha**
  
  - **Sinon**
  
  - **Dotenv**

</details>

<details>
  <summary>
    <strong>🪛 Scripts relevantes do <code>package.json</code></strong>
  </summary><br>

  - `dev`: Roda a aplicação na porta `3001`;
    - *uso (na raiz do projeto): `npm run dev`*

  - `db:reset`: Roda os scripts do `Sequelize` restaurando o **banco de dados**. Utilize esse script caso ocorra algum problema no seu banco local;
    - *uso (na raiz do projeto): `npm run db:reset`*

  - `test`: Roda todos os testes;
    - *uso (na raiz do projeto): `npm test`*

</details>

 <details>
  <summary>
    <strong>‼️ Antes de começar a utilizar</strong>
  </summary><br>

  1. Certifique-se que possui o bando de dados MYSQL em sua máquina

  2. Configuração das variáveis de ambiente

    - Caso não queira utilizar variável de ambiente: Vá no arquivo src/database/config/database.ts e modifique manualmente.
  
 </details>

<details>
  <summary>
    <strong>🤝 Passo a Passo</strong>
  </summary><br>

  1. Clone o repositório

  - Use o comando: `git clone git@github.com:msennaa/ttbackend.git`
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd ttbackend`

  2. Instale as dependências

  - Para isso, use o seguinte comando: `npm install`
  
  3. Restaure o banco de dados

  - Para isso, use o seguinte comando na raiz do projeto: `npm run db:reset`
  
  4. Subindo a aplicação na porta 3001

  - Para isso, use o seguinte comando na raiz do projeto: `npm run dev`
  
  </details>
  
<details>
  <summary>
    <strong>🗣 Me dê feedbacks sobre o projeto!</strong>
  </summary><br>

  Qualquer tipo de feedback é bem vindo para que eu possa continuar melhorando. 
   - **senamatheusjob@gmail.com**

</details>


---

  
# Especificações do projeto

---

####  1 - Rotas de cadastro de atletas (POST)

- Competição de yoga: `http://localhost:3001/yoga`

- Competição de hidratação: `http://localhost:3001/hidratation`

- Competição de perda de peso: `http://localhost:3001/weight`

- Competição de dardos: `http://localhost:3001/dart`
<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

  - Se todos os campos estão preenchidos.
    - Segue abaixo os retornos caso o preenchimento não seja o esperado ou o cadastro do atleta seja feito em uma competição que já foi finalizada
    
    ```json
    { "message": "Athlete is required" }
    ```
    
    ```json
    { "message": "Value is required" }
    ```
    
    ```json
    { "message": "Unity is required" }
    ```
    
    ```json
    { "message": "Athlete must be at least 3 characters"}
    ```
    
    ```json
    { "message": "Athlete must be a string"}
    ```
    
    ```json
    { "message": "Value must be a string" }
    ```
    
    ```json
    { "message": "Invalid value" }
    ```
    
    ```json
    { "message": "Unity must be a string" }
    ```
    
    ```json
    { "message": "Invalid Unity" }
    ```
  
    ```json
    { "message": "This competition is over" }
    ```

</details>

####  2 - Rotas que retornam a tabela do campeonato (GET)

- Competição de yoga: `http://localhost:3001/yoga`

- Competição de hidratação: `http://localhost:3001/hidratation`

- Competição de perda de peso: `http://localhost:3001/weight`

- Competição de dardos: `http://localhost:3001/dart`
<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

  - Se está ordenado corretamente.
    - Segue abaixo o retorno dos campeonatos
    
```json
[
    {
        "posicao": 1,
        "competicao": "campeonato de yoga",
        "atleta": "Yuri",
        "valor": "10",
        "unity": "m"
    },
    {
        "posicao": 2,
        "competicao": "campeonato de yoga",
        "atleta": "Renata",
        "valor": "2",
        "unity": "m"
    },
    {
        "posicao": 3,
        "competicao": "campeonato de yoga",
        "atleta": "Joao das Neves",
        "valor": "10",
        "unity": "s"
    },
    {
        "posicao": 4,
        "competicao": "campeonato de yoga",
        "atleta": "Rui",
        "valor": "2",
        "unity": "s"
    }
]
```

---
    
```json
[
    {
        "posicao": 1,
        "competicao": "campeonato de hidratação",
        "atleta": "Rubens",
        "valor": "8",
        "unity": "l"
    },
    {
        "posicao": 2,
        "competicao": "campeonato de hidratação",
        "atleta": "Marcio",
        "valor": "2",
        "unity": "l"
    },
    {
        "posicao": 3,
        "competicao": "campeonato de hidratação",
        "atleta": "Joao",
        "valor": "500",
        "unity": "ml"
    },
    {
        "posicao": 4,
        "competicao": "campeonato de hidratação",
        "atleta": "Oseias",
        "valor": "150",
        "unity": "ml"
    }
]
```

---
    
```json
[
    {
        "posicao": 1,
        "competicao": "campeonato de perda de peso",
        "atleta": "Brenda",
        "valor": "30",
        "unity": "kg"
    },
    {
        "posicao": 2,
        "competicao": "campeonato de perda de peso",
        "atleta": "Ricardo",
        "valor": "2",
        "unity": "kg"
    },
    {
        "posicao": 3,
        "competicao": "campeonato de perda de peso",
        "atleta": "Paula",
        "valor": "500",
        "unity": "g"
    },
    {
        "posicao": 4,
        "competicao": "campeonato de perda de peso",
        "atleta": "Andre",
        "valor": "100",
        "unity": "g"
    }
]
```
---
    
```json
[
    {
        "posicao": 1,
        "competicao": "campeonato de dardos",
        "atleta": "Marco",
        "valor": "30",
        "unity": "m"
    },
    {
        "posicao": 2,
        "competicao": "campeonato de dardos",
        "atleta": "Ursula",
        "valor": "15",
        "unity": "m"
    },
    {
        "posicao": 3,
        "competicao": "campeonato de dardos",
        "atleta": "Roberto",
        "valor": "50",
        "unity": "cm"
    },
    {
        "posicao": 4,
        "competicao": "campeonato de dardos",
        "atleta": "Irineu",
        "valor": "10",
        "unity": "cm"
    }
]
```

</details>

####  3 - Rotas que finalizam e reiniciam as competições (PUT)

- Competição de yoga: `http://localhost:3001/yoga`

- Competição de hidratação: `http://localhost:3001/hidratation`

- Competição de perda de peso: `http://localhost:3001/weight`

- Competição de dardos: `http://localhost:3001/dart`
<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

  - Se é possível finalizar e reiniciar a competição.
    - Segue abaixo o retorno das atualizações.
    
    ```json
    { "message": "Finishing competition" }
    ```
    
    ```json
    { "message": "Restarting competition" }
    ```

</details>

####  4 - Rotas de cadastro de competição (POST)

- Competição de yoga: `http://localhost:3001/register`

<details>
  <summary>
    <b>O que será avaliado</b>
  </summary>

  - Se todos os campos estão preenchidos.
    - Segue abaixo os retornos caso o preenchimento não seja o esperado
    
    ```json
    { "message": "competitionName is required" }
    ```
    
    ```json
    { "message": "competitionName must be a string" }
    ```
    
    ```json
    { "message": "competitionName must be at least 3 characters" }
    ```
</details>
