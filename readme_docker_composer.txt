===============================================================================================================
					** Estrutura da aplicação **
meu-projeto/
├── backend/
│   ├── Dockerfile      ← vamos criar aqui
│   ├── pom.xml         ← (projeto Maven)
│   └── src/
│       └── main/
│           └── java/...
└── frontend/
    ├── Dockerfile
    └── index.html

===============================================================================================================
					** arquivo docker-compose.yml **
version: "3.8"
services:
  backend:
    build: ./backend
    container_name: spring-api
    ports:
      - "8080:8080"
    networks:
      - app-network

  frontend:
    build: ./frontend
    container_name: nginx-front
    ports:
      - "80:80"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge




===============================================================================================================
					** Docker file do springboot **

# Etapa 1 — build da aplicação (com Maven)
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copia o pom.xml e baixa dependências (cache inteligente)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código e compila
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2 — imagem final (leve, só o JAR)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia o jar da etapa anterior
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta padrão do Spring Boot
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]
