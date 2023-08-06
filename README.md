# Nombre del Proyecto #
Desarrollo de módulos y funcionalidades para aplicación móvil para gestión de comunidades pequeñas y medianas en Chile

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

-- Las dependencias del proyecto, tanto Backend como Frontend, se encuentran en sus respectivos package.json.

## Configuracion de la base de datos
- Para la instalacion y despliegue de la base de datos existente, debe dirigirse a la carpeta MongoDB, en la cual se encontrara los pasos a seguir para replicar la base de datos de MongoDB Atlas.

## Configuraciones de Ejecución para Entorno de Desarrollo/Producción
- Clonar el repositorio de github
```
git clone https://github.com/Benjamin343/DockerProyecto
```
### Instalar dependencias del backend
- Entrar en la carpeta de /Backend/vecired y ejecutar los siguientes comandos:
```
npm install
```
### Ejecución entorno producción Backend
```

```
### Instalar dependencias del Frontend
```
npm install
```
### Ejecución entorno producción Frontend
#### Crear la build de producción
```

```
#### Iniciar el ambiente de producción
```

```

### Credenciales de Base de datos y variables de ambiente
#### Backend
- Navegar hasta el directorio /DockerProyecto/Backend/vecired/clases/ o /DockerProyecto/Backend/vecired/dist/clases/ y configurar el puerto deseado en el archivo 'servidor.ts' o 'servidor.js' respectivamente.

#### Frontend
- Navegar hasta el directorio /DockerProyecto/Frontend/vecired-frontend/src/enviroments y configurar el puerto deseado en el archivo 'enviroment.prod.ts' o 'enviroment', dependiendo de si quiere levantar una version de produccion o desarrollo respectivamente.

### Docker
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

*** Debido a el funcionamiento de Docker, el Dockerfile de frontend no funciona, ya que Docker no maneja de manera correcta un contenedor con una version de NodeJS antigua (Node 12.14.1) ***
                                                            *** Lamentamos este inconveniente, pero esta fuera de nuestro poder ***

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