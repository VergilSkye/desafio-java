<div align="center">

  # Desafio Técnico Java  
  Essa aplicação foi iniciada com JHipster 7.0.0 e é bastante customizada.
  
  Deploy em [heroku](https://agile-badlands-61531.herokuapp.com/).  
  Docker em [docker-hub](https://registry.hub.docker.com/r/vergilskye/pessoa).

  ![](https://img.shields.io/badge/Autor-Virgilio%20Stefanin-brightgreen)
  ![](https://img.shields.io/badge/Back--End-Spring%20Boot-brightgreen)
  ![](https://img.shields.io/badge/Front--End-Angular%2011-brightgreen)
  
</div> 

<sup>
É necessário ter instalado o JDK, pelo menos o 11, na sua máquina. Caso não tenha, por favor use a imagem docker.
</sup>

## Rodando Testes Unitários
Para rodar os testes unitários, por favor use o comando.
```
./mvnw -Pprod clean test
```

## Rodando Testes de Integração
Para rodar os testes de integração, por favor use o comando.
```
./mvnw -Pprod clean verify
```

### Rodando o pacote jar

depois de ser verificado a aplicação com os testes de integração
comece o programa java utilizando o comando.
```
java -jar target/*.jar
```
Agora navegue para [http://localhost:8080](http://localhost:8080) no seu navegador.

### Testes frontend

Testes unitários são rodados pelo [Jest]() com o comando.
```
npm test
```

### Outras Informações
Essas são todas as instruções sobre os testes.
Para criar apenas o jar com o swagger habilitado rode o comando.
```
./mvnw -Pprod -Papi-docs package -DskipTests=true
```
