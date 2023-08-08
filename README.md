# VeciRed #

## Descripción del proyecto

El proyecto VeciRed está pensado para entregar una opción de software a las juntas vecinales o comunidades de vecinos, ya que las opciones que estas tienen son limitadas o no permiten agilizar realmente los procesos internos dentro de las comunidades.

## Software stack

El proyecto Vecired es una aplicacion movil que utiliza un modelo de stack MEAN (Mongoose, Angular, Express y NodeJS), el cual tiene las siguientes caracteristicas:

- Mongoose latest
- Angular 5.5.2
- Express ^4.17.1
- NodeJS (Node Version 12.14.1 para Frontend y Node Version 16.14.2 para Backend)

Aparte, tambien se utiliza el siguiente software:

- MongoDB Compass 1.37.0
- Ionic Framework 5.4.16
- TSC latest
- Python 2.7.18
- SASS (SCSS)

* Las dependencias del proyecto, tanto Backend como Frontend, se encuentran en sus respectivos package.json.

## Configuracion de la base de datos
- Para la instalacion y despliegue de la base de datos existente, debe dirigirse a la carpeta MongoDB, en la cual se encontrara los pasos a seguir para replicar la base de datos de MongoDB Atlas.

## Configuraciones de Ejecución para Entorno de Desarrollo/Producción
Antes de todo debemos ejecutar los siguientes comandos:
```
su -
```

Despues:

```
apt-get update
```

E instalar curl

```
apt-get install  -y curl git
```


Clonar el repositorio de github

```
git clone https://github.com/Benjamin343/DockerProyecto
```

## Instalar NVM 

- Ejecutar el siguiente comando en una terminal bash

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

- Reiniciar la terminal

## Instalar Node.js

En nuestro caso ocuparemos Node.JS 16.14.2 para Backend y Node.JS 12.14.1 para Frontend

- Para instalar Node.JS 16.14.2 ejecuta el siguiente comando en una terminal bash

```
nvm install 16.14.2
```

- Para instalar Node.JS 12.14.1 ejecuta el siguiente comando en una terminal bash

```
nvm install 12.14.1
```

## Instalar dependencias del backend

- Primero que todo, establece la version 16.14.2 como la version predeterminada
```
nvm use 16.14.2
```

- Entrar en la carpeta de /Backend/vecired y ejecutar los siguientes comandos:
```
npm install
```

## Ejecución entorno producción Backend
```

```

## Ejecución entorno desarrollo Backend

- Para la ejecución del entorno de desarrollo debes de dirigirte al directorio /Backend/vecired y ejecutar el siguiente comando:

```
node dist/
```

## Instalar dependencias del Frontend

- Primero que todo, establece la version 12.14.1 como la version predeterminada
```
nvm use 12.14.1
```

- Despues, entrar en la carpeta de /Frontend/vecired-frontend y ejecutar el siguiente comando:
```
npm install
```

## Instalar Cordova e Ionic

Para esto necesitaras dirigirte al directorio de /Frontend/vecired-frontend y ejecutar los siguientes comandos:

- Cordova
```
npm install -g cordova
```

- Ionic 7.1.1
```
npm install -g @ionic/cli@7.1.1
```


## Ejecución entorno producción Frontend
### Crear la build de producción
```

```
### Iniciar el ambiente de producción
```

```

## Ejecución entorno desarrollo Frontend

### Si desea levantar el entorno de desarrollo como localhost, debe de seguir los siguientes pasos:
- Para la ejecución del entorno de desarrollo debe de dirigirse al directorio /Frontend/vecired-frontend y ejecutar el siguiente comando:
```
ionic serve
```
- Si desea definir un puerto, debe ejecutar el comando de la siguiente manera:
```
ionic serve -p PUERTO
```

### Si desea levantar el entorno de desarrollo con una IP externa, debe de seguir los siguientes pasos:
Si quiere ejecutar el entorno de desarrolo, debe declararlo en el comando de la siguiente manera:
```
ionic serve --external
```
- Si desea definir un puerto, debe ejecutar el comando de la siguiente manera:
```
ionic serve --external -p PUERTO
```

## Solución de problemas Frontend
En el caso de que no funcionara la ejecucion del entorno de desarrollo, utilizar la version 16.14.2 como la version predeterminada:

```
nvm use 16.14.2
```

Despues debe de ejecutar los siguientes comandos para instalar las dependencias necesarias del frontend:

npm install
```
npm install
```

Instalar Cordova
```
npm install -g cordova
```

Instalar Ionic 7.1.1
```
npm install -g @ionic/cli@7.1.1
```


## Credenciales de Base de datos y variables de ambiente
### Backend
- Navegar hasta el directorio /DockerProyecto/Backend/vecired/clases/ o /DockerProyecto/Backend/vecired/dist/clases/ y configurar el puerto deseado en el archivo 'servidor.ts' o 'servidor.js' respectivamente.

### Frontend
- Navegar hasta el directorio /DockerProyecto/Frontend/vecired-frontend/src/enviroments y configurar el puerto deseado en el archivo 'enviroment.prod.ts' o 'enviroment', dependiendo de si quiere levantar una version de produccion o desarrollo respectivamente.

## Docker
Con una terminal, moverse al directorio del repositorio clonado.
Una vez dentro de este, debe dirigirse al directorio 'Dockerfiles' y moverse a las siguientes 2 carpetas:

### Dockerfile Backend
- Entrar a la carpeta llamada 'Dockerfile Backend'
```bash
docker build -t imagen Dockerfile:latest
```
Una vez construida la imagen, lanzar un contenedor.

```bash
docker run --rm -ti -p 3000:3000
```

### Dockerfile Frontend

*** Debido al funcionamiento de Docker, el Dockerfile de frontend no funciona, ya que Docker no maneja de manera correcta un contenedor con una version de NodeJS antigua (Node 12.14.1) ***

- Entrar a la carpeta llamada 'Dockerfile Frontend'
```bash
docker build -t Dockerfile:latest
```
Una vez construida la imagen, lanzar un contenedor.

```bash
docker run --rm -ti -p 5000:5000
```

### Entrar a la web

Ir a un navegador web y ejecutar la siguiente url: http://IP_FRONTEND:5000
