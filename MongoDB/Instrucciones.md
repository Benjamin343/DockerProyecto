# Instrucciones para ejecutar la base de datos #

## 1-Instalar mongoDB y mongoTools: ##
```
sudo apt-get install gnupg curl

curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

echo "deb [signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg] https://repo.mongodb.org/apt/debian $(lsb_release -cs)/mongodb-org/6.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

sudo apt-get update
```

### Instalar mongo ###
```
sudo apt-get install -y mongodb-org-tools
sudo systemctl enable --now mongod

## 2-Crear la base de datos donde va a guardar los datos: ##

### Ejecutar los siguientes comandos: ###
#### 1- Para entrar en una shell de mongo, debe escribir los siguientes comandos: ####
        mongo
#### 2- Para crear una base de datos use el siugiente comando: ####
        use "nombre de la base de datos a crear"
#### 3- Para verificar si la base de datos esta funcionando, ejecutar como comando el nombre de la base de datos creada ####

## 3- Despues, entrar al directorio donde se guardo la compia de la base de datos: ##
        cd dump/

## 4- Una vez dentro, ejecutar el siguiente comando: ##
        mongorestore --uri=mongodb://localhost:27017 --db="nombre de la base de datos" --dir=test

