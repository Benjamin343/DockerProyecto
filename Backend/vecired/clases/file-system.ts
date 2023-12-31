import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';


export default class FileSystem {

    constructor() {};
    guardarImagenTemp(file: FileUpload, idUsuario: string)
    {

        return new Promise((resolve: any, reject) =>
        {
            //Crear carpeta
            const path = this.crearCarpetaUsuario(idUsuario);
            // console.log(file.name);
            // console.log(path);

            //Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            
            //Mover la imagen a la carpeta temp
            file.mv(`${path}/${nombreArchivo}`, (err : any) =>
            {
                if(err)
                {
                    reject(err);
    
                }else
                {
                    resolve();
                }
    
    
            })

        });
       

        
    }

    private generarNombreUnico( nombreOriginal: string){

        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

        const idUnico = uniqid();

        return `${idUnico}.${extension}`;

    }

    private crearCarpetaUsuario(idUsuario: string)
    {
        const rutaUsuario = path.resolve( __dirname, '../imagenesAvisos/', idUsuario);
        const rutaUsuarioTemporal = rutaUsuario + '/temp'

        const existe = fs.existsSync(rutaUsuario);

        //comprobamos si es que existe o no la carpeta del usuario en donde se almacenaran las imagenes de los avisos
        if(!existe)
        {
            fs.mkdirSync(rutaUsuario);
            fs.mkdirSync(rutaUsuarioTemporal);
        }

        return rutaUsuarioTemporal;
    }


    imagenesTempHaciaAvisos(idUsuario: string)
    {
        const rutaUsuarioTemporal = path.resolve( __dirname, '../imagenesAvisos/', idUsuario, 'temp');
        const rutaUsuarioAvisos = path.resolve( __dirname, '../imagenesAvisos/', idUsuario, 'avisos');

        if( !fs.existsSync(rutaUsuarioTemporal))
        {
            return [];
        }

        if( !fs.existsSync(rutaUsuarioAvisos))
        {
            fs.mkdirSync(rutaUsuarioAvisos);
        }

        const imagenTemp = this.obtenerImagenesTemp(idUsuario);

        imagenTemp.forEach(imagen => 
            {
                fs.renameSync(`${rutaUsuarioTemporal}/${imagen}`, `${rutaUsuarioAvisos}/${imagen}`)
            });

        return imagenTemp;

    }

    private obtenerImagenesTemp(idUsuario: string)
    {
        const rutaUsuarioTemporal = path.resolve( __dirname, '../imagenesAvisos/', idUsuario, 'temp');

        return fs.readdirSync(rutaUsuarioTemporal) || [];
    }


    getFotoUrl(idUsuario: string, imgAviso: string)
    {
        const rutaFotoBD = path.resolve(__dirname, '../imagenesAvisos', idUsuario, 'avisos', imgAviso );

        const existe = fs.existsSync(rutaFotoBD);

        if(!existe)
        {
            return path.resolve(__dirname, '../assets/noDisponible.jpg');
        }

        return rutaFotoBD;

    }
}