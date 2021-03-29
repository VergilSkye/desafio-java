# Desafio Técnico Java
Essa aplicação foi iniciada com JHipster 7.0.0 e é bastante customizada.

Deploy em [heroku](https://agile-badlands-61531.herokuapp.com/).

Docker em [docker-hub](https://registry.hub.docker.com/r/vergilskye/pessoa).

É necessário ter instalado o JDK, pelo menos o 11, na sua máquina. Caso não tenha, por favor user a imagem docker
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

depois de ser rodado os testes de integração
rode o spring boot com o 
```
java -jar target/*.jar
```
Agora navegue para [http://localhost:8080](http://localhost:8080) no seu browser.

### Testes frontend

Testes unitários são rodados pelo [Jest]() com o comando

```
npm test
```


Essas são todas as instruções para rodas o teste e para roda a aplicação,
caso queria apenas o jar rode o comando.
```
./mvnw -Pprod -Papi-docs package -DskipTests=true
```
