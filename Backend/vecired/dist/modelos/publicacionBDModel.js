"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publicacion = exports.OpcionesEstado = exports.OpcionesCategoria = void 0;
const mongoose_1 = require("mongoose");
var OpcionesCategoria;
(function (OpcionesCategoria) {
    OpcionesCategoria["Hogar"] = "Hogar";
    OpcionesCategoria["Entretenimiento"] = "Entretenimiento";
    OpcionesCategoria["Electronica"] = "Electronica";
    OpcionesCategoria["Ropa"] = "Ropa";
    OpcionesCategoria["Gastronomia"] = "Gastronomia";
})(OpcionesCategoria || (exports.OpcionesCategoria = OpcionesCategoria = {}));
var OpcionesEstado;
(function (OpcionesEstado) {
    OpcionesEstado["Activa"] = "Activa";
    OpcionesEstado["Inactiva"] = "Inactiva";
})(OpcionesEstado || (exports.OpcionesEstado = OpcionesEstado = {}));
const estructuraPublicacion = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
    },
    imagenes: [String],
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    categoria: {
        type: String,
        enum: Object.values(OpcionesCategoria),
        required: [true, 'La categoria es obligatoria'],
    },
    usuarioId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID del usuario es obligatorio'],
    },
    comunidadId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comunidad',
        required: [true, 'El ID de la comunidad es obligatorio'],
    },
    estado: {
        type: String,
        enum: Object.values(OpcionesEstado),
        default: OpcionesEstado.Activa,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
});
exports.Publicacion = (0, mongoose_1.model)('Publicacion', estructuraPublicacion);
