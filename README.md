# AMQP Practice [PostgresSQL | Nodejs | RabbitMQ]

Este proyecto es una demostración de cómo usar RabbitMQ para recibir notificaciones de PostgreSQL y cómo manejar esos eventos en un consumidor. Este README proporciona instrucciones sobre cómo configurar y ejecutar el proyecto, así como cómo probarlo en pgAdmin.

## Requisitos

- **Node.js** y **npm** (o **yarn**)
- **PostgreSQL**
- **RabbitMQ**
- **pgAdmin** (opcional para administrar PostgreSQL)
- **docker cli o desktop**

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu_usuario/amqppractice.git
   cd amqppractice

2. **Instalar dependencias**

```
npm install
```

3. **build el proyecto**
```
npm run build
```

4. **Inicia el proyecto**

```
npm run start:all
```

**para detener el proyeto**
```
npm run stop:all
```

## Como funciona
Una vez que corres los contenedores al haber hecho npm run start:all, el producer se encontrara escuchando a cualquier insercion que se haga a postgresql.
Puedes utilizar pgadmin para simular una insercion. 
Puedes verificar el rabbitMQ interface, yendo a: 
```
http://0.0.0.0:15672
```

El usuario para entrar a RabbitMQ interface es "guest" y el password sera tambien "guest"

## Notification
Dentro de la base de datos de postgreSQL, para la tabla "orders" (actualmente es la unica tabla que se crea), he colocado un "trigger" con una funcion que, cada inserccion hecha a esta tabla, es notificada, esto es lo que activa el producer, recibe la notificacion, toma el mensaje y lo envia a la cola de rabbitMQ. 

## users
Este es un proyecto de prueba, asi que, los usuarios y claves no estan dentro de un .env, sino que se colocaron en el docker-compose y en el enviroment del respectivo contenedor. 

## Network:
La red es creada en el docker-compose, para que los contenedores puedan tener acceso uno al otro. 

