import Servidor from "./clases/servidor";
import mongoose from 'mongoose';
import express from "express";
import fileUpload from 'express-fileupload';
import cors from 'cors';
import rutasUsuario from "./rutas/usuario";
import rutasAvisos from "./rutas/avisos";
import rutasComunidad from "./rutas/comunidad";
import rutasAcuerdos from "./rutas/acuerdos";
import rutasSolicitud from './rutas/solicitud';
import rutasCertificados from './rutas/certificado';
import rutasEmisor from "./rutas/emisor";
import rutasPublicacion from "./rutas/publicacion";

const servidor = new Servidor();


servidor.app.use(express.urlencoded ({extended: true}));
servidor.app.use(express.json() );

//configuracion para obtener los archivos que subimos 
servidor.app.use(fileUpload(
    {
        // useTempFiles : true,
        //tempFileDir : '/tmp/'
    }
));

//Configuración de CORS para que el servidor no bloquee peticiones hTTp de origin !=
servidor.app.use(cors({origin: true, credentials: true}));

//rutas de la aplicacion
servidor.app.use('/usuario', rutasUsuario);
servidor.app.use('/avisos', rutasAvisos);
servidor.app.use('/comunidad', rutasComunidad);
servidor.app.use('/acuerdos', rutasAcuerdos);
servidor.app.use('/solicitud', rutasSolicitud);
servidor.app.use('/certificados', rutasCertificados);
servidor.app.use('/emisor', rutasEmisor);
servidor.app.use('/publicacion', rutasPublicacion);


//conexion a base de datos de verdad
mongoose.connect('mongodb+srv://normanvergara1901:kOc5Gp0Gb7dhzlmu@vecired.l8aedga.mongodb.net/',
                (err) => 
                {
                    if(err) throw err;
                    console.log("Conectado exitosamente a BD1");
                })



//conecion a base de dato local
// mongoose.connect('mongodb://localhost:27017/veciRed',
//                 (err) => 
//                 {
//                     if(err) throw err;
//                     console.log("Conectado exitosamente a BD1");
//                 })


// main().catch(err => console.log(err));
// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/veciRed').then( () =>
//      {console.log("Conectado exitosamente a BD")})
//   }

//levantamos el servidor
servidor.start(() => 
{
    console.log(`Servidor operativo en puerto ${servidor.port} `);

});