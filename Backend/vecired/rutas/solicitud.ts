import { Router, Request, Response } from "express";
import { verificaToken } from "../middlewares/autenticacion";
import { Solicitud } from '../modelos/solicitudBDModel';
import { Usuario } from '../modelos/usuarioBDModel';

//crearemos el objeto con el cual realizaremos las peticiones
const rutasSolicitud = Router();

//crear una solicitud
rutasSolicitud.post('/crear', [verificaToken], async (request: any, response: Response) =>
{
    //INICIO VALIDACIONES BACKEND
    var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,250})+$/g;

    if(caracteres.test(request.body.mensaje) == false)
    {
        return response.json({
            ok: false,
            mensaje: 'Caracteres invalidos en mensaje'
         });
    }

    if(request.body.mensaje.length > 250 )
 {
     return response.json({
         ok: false,
         mensaje: 'Error en título'
          });
 }

//FIN VALIDACIONES BACKEND

    // la solicitud que se envia toma la id desde el token y la _id de comunidad, se tiene que enviar en peticion como _id, no "comunidad"
    // o lo tomara como 'undefined'

    const dataSolicitud = {
        usuario: request.usuario._id,
        comunidad: request.body._id,
        mensaje: request.body.mensaje
    }

    var existeSolicitud: any = {};
    var codigo = 0;
    var len =10;

    /* codigo = 0 => se puede crear
       codigo = 1 => ya existe solicitud en BD
       codigo = 2 => usuario ya pertenece a esa comunidad
    */
   //preguntamos si existe ya la solicitud en BD
    existeSolicitud = await Solicitud.find({comunidad: dataSolicitud.comunidad,
                                      usuario: dataSolicitud.usuario})
                                     .exec();
    len = Object.keys(existeSolicitud).length;
    
    //verificaremos si es que usuario ya pertenece a esa comunidad
    // perteneceComunidad = await Usuario.findOne({_id: request.usuario._id}, 
    //                                             {
    //                                              "comunidad" :1})
    
    // arrayComunidades.push(perteneceComunidad.comunidad);
    // arrayRol.push(perteneceComunidad.rol);
    // found = dataSolicitud.comunidad;
    
    // const index = arrayComunidades.indexOf(dataSolicitud.comunidad);
    //     if (index != -1) {
    //         codigo = 2;
    //         entro = true;
            
    //     }
   
    if(len != 0 )
    {
        codigo = 1;
    }
    
    
    if(codigo == 1)
    {
        response.json({
            ok: false,
            mensaje: 'Solicitud duplicada.'      
        });

    }

    if( codigo == 0)
    {
        Solicitud.create(dataSolicitud).then(solicitudBD =>
            {
                response.json({
                    ok: true,
                    mensaje: 'solicitud creada'
                });
    
            });
    }

});


rutasSolicitud.get('/', [verificaToken], async (request: any, response: Response) =>
{
    const solicitudes = await Solicitud.find({comunidad: request.usuario.comunidad})
                                 .populate("usuario",{nombre: 1})
                                 .populate("comunidad",{nombreComunidad: 1})
                                 .exec();
    
    response.json({
        solicitudes,
        ok: true
    });

});

//funcion para eliminar la solicitud
rutasSolicitud.post('/eliminar', (request:any, response: Response) =>
{
    Solicitud.deleteOne({_id: request.body.idSolicitud}, (err: any, solicitudDeleted: any) =>
    {
        if(err) throw err;

        if(!solicitudDeleted)
        {
            return request.json({
                ok: false,
                mensaje:'no se elimino'
            });
        }

        response.json({
            ok: true
        })
    })
});


//funcionar para aceptar una solicitud
rutasSolicitud.post('/aceptar', (request:any, response: Response) =>
{
    const dataSolicitud = {
        idComunidad : request.body.idComunidad,
        idUsuario: request.body.idUsuario,
        idSolicitud: request.body.idSolicitud
    };

    Usuario.findOne({_id: dataSolicitud.idUsuario}, (err: any, usuarioBD: any) =>
    {
        if(err) throw err;
        if(!usuarioBD)
        {
            return response.json({
                ok: false,
                mensaje: 'ID incorrecta'
                });
        }

        //inicializamos array en 0 para pasarle los valores y actualizarlos
        var arrayComunidades = [];
        var arrayRol = [];
        var newRol = 2;
        arrayComunidades = usuarioBD.comunidad;
        arrayRol = usuarioBD.rol;

        arrayComunidades.push(dataSolicitud.idComunidad);
        arrayRol.push(newRol);

        //pasamos lo valores actualizados a un obeto
        //para actualizar data of user
        const dataUsuario = 
                    {
                    _id: usuarioBD._id,
                    rol: arrayRol,
                    comunidad: arrayComunidades
                    }
        
        //ahora que tenemos listo la data el usuario actualizaremos la info
        Usuario.findByIdAndUpdate(dataSolicitud.idUsuario, dataUsuario, {new: true}, (err, updatedUBD) =>
        {
            if(err) throw err;

            if(!updatedUBD)
            {
                return request.json({
                    ok: false,
                    mensaje: 'Usuario no encontrado'
                    })
            }


            Solicitud.deleteOne({_id: dataSolicitud.idSolicitud}, (err: any, solicitudDeleted: any) =>
            {
                if(err) throw err;

                if(!solicitudDeleted)
                {
                    return request.json({
                    ok: false,
                    mensaje:'no se elimino'
                    });
                }

                response.json({
                    ok: true,
                    dataSolicitud,
                    usuarioBD,
                    dataUsuario,
                    updatedUBD
                })
            }) //fin deleteOne

            



            



        } ) //fin actualizar usuario



        



    }) //fin findOne

});

rutasSolicitud.get('/length', [verificaToken], async (request: any, response: Response) =>
{
    const solicitudes = await Solicitud.find({comunidad: request.usuario.comunidad})
                                 .populate("usuario",{nombre: 1})
                                 .populate("comunidad",{nombreComunidad: 1})
                                 .exec();
    
    var length = solicitudes.length;
    
    response.json({
        length
    });

});




//exportamos el objeto para ocuparla en index
export default rutasSolicitud;