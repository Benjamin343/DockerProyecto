"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicacionBDModel_1 = require("../modelos/publicacionBDModel");
const autenticacion_1 = require("../middlewares/autenticacion");
const usuarioBDModel_1 = require("../modelos/usuarioBDModel");
const node_cron_1 = __importDefault(require("node-cron"));
const rutasPublicacion = (0, express_1.Router)();
//Cambia el estado de una publicacion
const EstadoPublicacion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dosSemanasEnMilisegundos = 2 * 7 * 24 * 60 * 60 * 1000;
        const fechaActual = new Date();
        const publicacionesActivas = yield publicacionBDModel_1.Publicacion.find({
            estado: publicacionBDModel_1.OpcionesEstado.Activa,
            fechaCreacion: { $lte: new Date(fechaActual.getTime() - dosSemanasEnMilisegundos) },
        });
        for (const publicacion of publicacionesActivas) {
            publicacion.estado = publicacionBDModel_1.OpcionesEstado.Inactiva;
            yield publicacion.save();
        }
    }
    catch (error) {
        console.log('Error al cambiar el estado de las publicaciones', error);
    }
});
node_cron_1.default.schedule('0 0 * * *', EstadoPublicacion);
//Renovar publicacion despues de 2 semanas de la creacion de esta
rutasPublicacion.post('/renovar/:publicacionId', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.usuario._id;
        const publicacionId = req.params.publicacionId;
        //verificamos si la publicacion existe y pertenece al usuario actual
        const publicacion = yield publicacionBDModel_1.Publicacion.findOne({ _id: publicacionId, usuarioId });
        if (!publicacion) {
            return res.status(404).json({
                ok: false,
                mensaje: 'La publicacion no existe o no te pertenece',
            });
        }
        //Verificamos si ha pasado al menos dos semanas desde la creacion de la publicacion
        const dosSemanasEnMilisegundos = 2 * 7 * 24 * 60 * 60 * 1000;
        const fechaActual = new Date();
        const fechaCreacionPublicacion = new Date(publicacion.fechaCreacion);
        if (fechaActual.getTime() - fechaCreacionPublicacion.getTime() < dosSemanasEnMilisegundos) {
            return res.json({
                ok: false,
                mensaje: 'No ha pasado el periodo de dos semanas para renovar la publicacion.',
            });
        }
        publicacion.fechaCreacion = new Date();
        yield publicacion.save();
        res.json({
            ok: true,
            mensaje: 'La publicacion ha sido renovada existosamente.',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al renovar la publicacion.',
        });
    }
}));
//Ver todas las publicaciones de la comunidad
rutasPublicacion.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validaciones
        const usuario = yield usuarioBDModel_1.Usuario.findById(req.usuario._id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Usuario no encontrado.'
            });
        }
        //fin validaciones
        /*const comunidadId = req.Usuario.Comunidad;
        const publicaciones = await Publicacion.find({ comunidad: comunidadId })
        .populate({ path: 'comunidad' })
        .exec();*/
        const comunidad = usuario.comunidad;
        const publicaciones = yield publicacionBDModel_1.Publicacion.find({ comunidadId: { $in: comunidad } }).populate('usuarioId');
        if (publicaciones.length === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No se encontraron publicaciones.'
            });
        }
        res.json({
            publicaciones,
            ok: true
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener las publicaciones.',
            error
        });
    }
}));
//Crear publicacion
rutasPublicacion.post('/crear', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //VALIDACIONES
    //Validacion caracteres titulo
    var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,100})+$/g;
    if (caracteres.test(req.body.titulo) == false) {
        return res.json({
            ok: false,
            mensaje: 'Caracteres invalidos en el título.'
        });
    }
    //Validacion caracteres descripcion
    var caracteres2 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,500})+$/g;
    if (caracteres2.test(req.body.descripcion) == false) {
        return res.json({
            ok: false,
            mensaje: 'Caracteres invalidos en la descripción.'
        });
    }
    //Validacion longitud de titulo
    if (req.body.titulo.length > 100 || req.body.titulo.length <= 2) {
        return res.json({
            ok: false,
            mensaje: 'Título demasiado largo o corto.'
        });
    }
    //Validacion longitud descripcion
    if (req.body.descripcion.length > 500 || req.body.descripcion.length <= 2) {
        return res.json({
            ok: false,
            mensaje: 'Descripción demasiado larga o corta.'
        });
    }
    //Validacion si el precio es un numero
    const precio = Number(req.body.precio);
    if (isNaN(precio)) {
        return res.json({
            ok: false,
            mensaje: 'El precio debe ser un número válido.',
        });
    }
    //Validacion precio num positivo
    if (!Number.isInteger(precio) || precio <= 0) {
        return res.json({
            ok: false,
            mensaje: 'El precio debe ser un número entero positivo.',
        });
    }
    //Validacion Categoria
    const categoria = req.body.categoria;
    if (!Object.values(publicacionBDModel_1.OpcionesCategoria).includes(categoria)) {
        return res.json({
            ok: false,
            mensaje: 'La categoría no es válida.',
        });
    }
    //Validacion Imagenes
    /*if(!Array.isArray(req.body.imagenes) || req.body.imagenes.some((imagen: string) => typeof imagen !== 'string')){
        return res.json({
            ok:false,
            mensaje:'el campo imagenes debe ser un arreglo de cadenas (URL).',
        })
    }*/
    //Fin validaciones
    const dataPublicacion = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagenes: req.body.imagenes,
        precio: req.body.precio,
        categoria: req.body.categoria,
        usuarioId: req.usuario._id,
        comunidadId: req.usuario.comunidad,
        fechaCreacion: Date.now(),
    };
    publicacionBDModel_1.Publicacion.create(dataPublicacion).then(publicacionBD => {
        res.json({
            ok: true,
            dataPublicacion
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
}));
//Editar Publicacion
rutasPublicacion.post('/editar/:publicacionId', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //VALIDACIONES
    //Validacion caracteres titulo
    var caracteres = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,100})+$/g;
    if (caracteres.test(req.body.titulo) == false) {
        return res.json({
            ok: false,
            mensaje: 'Caracteres invalidos en el título.'
        });
    }
    //Validacion caracteres descripcion
    var caracteres2 = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9¡!?¿@-_.,/()= ]{1,500})+$/g;
    if (caracteres2.test(req.body.descripcion) == false) {
        return res.json({
            ok: false,
            mensaje: 'Caracteres invalidos en la descripción.'
        });
    }
    //Validacion longitud de titulo
    if (req.body.titulo.length > 100 || req.body.titulo.length <= 2) {
        return res.json({
            ok: false,
            mensaje: 'Título demasiado largo o corto.'
        });
    }
    //Validacion longitud descripcion
    if (req.body.descripcion.length > 500 || req.body.descripcion.length <= 2) {
        return res.json({
            ok: false,
            mensaje: 'Descripción demasiado larga o corta.'
        });
    }
    //Validacion si el precio es un numero
    const precio = Number(req.body.precio);
    if (isNaN(precio)) {
        return res.json({
            ok: false,
            mensaje: 'El precio debe ser un número válido.',
        });
    }
    //Validacion precio num positivo
    if (!Number.isInteger(precio) || precio <= 0) {
        return res.json({
            ok: false,
            mensaje: 'El precio debe ser un número entero positivo.',
        });
    }
    //Validacion Categoria
    const categoria = req.body.categoria;
    if (!Object.values(publicacionBDModel_1.OpcionesCategoria).includes(categoria)) {
        return res.json({
            ok: false,
            mensaje: 'La categoría no es válida.',
        });
    }
    //Validacion Imagenes
    /*if(!Array.isArray(req.body.imagenes) || req.body.imagenes.some((imagen: string) => typeof imagen !== 'string')){
        return res.json({
            ok:false,
            mensaje:'el campo imagenes debe ser un arreglo de cadenas (URL).',
        })
    }*/
    try {
        const usuarioId = req.usuario._id;
        const publicacionId = req.params.publicacionId;
        //Verificamos si la publicacion existe y pertenece al usuario actual
        const publicacion = yield publicacionBDModel_1.Publicacion.findOne({ _id: publicacionId, usuarioId });
        if (!publicacion) {
            return res.status(404).json({
                ok: false,
                mensaje: 'La publicacion no existe o no te pertenece.'
            });
        }
        publicacion.titulo = req.body.titulo;
        publicacion.descripcion = req.body.descripcion;
        publicacion.imagenes = req.body.imagenes;
        publicacion.precio = req.body.precio;
        publicacion.categoria = req.body.categoria;
        yield publicacion.save();
        res.json({
            ok: true,
            publicacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al editar la publicacion.'
        });
    }
}));
//Ver publicacion del mismo usuario
rutasPublicacion.get('/mis-publicaciones', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.usuario._id;
        const publicaciones = yield publicacionBDModel_1.Publicacion.find({ usuarioId });
        res.json({
            publicaciones,
            ok: true
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener las publicaciones del usuario.'
        });
    }
}));
//Borrar la publicacion del mismo usuario
rutasPublicacion.delete('/borrar/:publicacionId', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.usuario._id;
        const publicacionId = req.params.publicacionId;
        //Verificamos si la publicacion pertenece al usuario
        const publicacion = yield publicacionBDModel_1.Publicacion.findOne({ _id: publicacionId, usuarioId });
        if (!publicacion) {
            return res.status(404).json({
                ok: false,
                mensaje: 'La publicacion no existe o no pertenece al usuario.'
            });
        }
        //Eliminar la publicacion
        yield publicacionBDModel_1.Publicacion.findByIdAndRemove(publicacionId);
        res.json({
            ok: true,
            mensaje: 'Publicacion eliminada exitosamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al eliminar la publicacion.'
        });
    }
}));
//Borrar una publicacion especifica de otro usuario en una comunidad dependiendo de su rol
rutasPublicacion.delete('/borrarPublicaciones/:publicacionId', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.usuario._id;
        const publicacionId = req.params.publicacionId;
        //Verificamos si el usuario tiene el rol adecuado (en este caso el valor para el rol de miembro directiva es 2)
        const usuario = yield usuarioBDModel_1.Usuario.findOne({ _id: usuarioId, rol: 1 });
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                mensaje: 'No tienes permisos para borrar otras publicaciones.'
            });
        }
        //Verificamos si la publicacion existe y pertenece a la misma comunidad del usuario
        const publicacion = yield publicacionBDModel_1.Publicacion.findOne({ _id: publicacionId, comunidadId: { $in: usuario.comunidad } });
        if (!publicacion) {
            return res.status(404).json({
                ok: false,
                mensaje: 'La publicacion no existe o no pertenece a tu comunidad.'
            });
        }
        //Borramos la publicacion
        yield publicacionBDModel_1.Publicacion.findByIdAndDelete(publicacionId);
        res.json({
            ok: true,
            mensaje: 'La publicacion ha sido borrada exitosamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al borrar la publicacion.'
        });
    }
}));
exports.default = rutasPublicacion;
