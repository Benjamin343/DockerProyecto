import {Schema, Document, model} from 'mongoose';

export enum OpcionesCategoria {
    Hogar='Hogar',
    Entretenimiento='Entretenimiento',
    Electronica='Electronica',
    Ropa='Ropa',
    Gastronomia='Gastronomia',
}

export enum OpcionesEstado {
    Activa = 'Activa',
    Inactiva = 'Inactiva',
}


const estructuraPublicacion = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID del usuario es obligatorio'],
    },
    comunidadId: {
        type: Schema.Types.ObjectId,
        ref: 'Comunidad',
        required: [true, 'El ID de la comunidad es obligatorio'],
    },
    estado:{
        type: String,
        enum: Object.values(OpcionesEstado),
        default: OpcionesEstado.Activa,
    },
    fechaCreacion:{
        type: Date,
        default: Date.now,
    },
});

interface IPublicacion extends Document {
    titulo: string;
    descripcion: string;
    imagenes: string[];
    precio: number;
    categoria: OpcionesCategoria;
    usuarioId: Schema.Types.ObjectId;
    comunidadId: Schema.Types.ObjectId;
    estado: OpcionesEstado;
    fechaCreacion: Date;
}

export const Publicacion = model<IPublicacion>('Publicacion', estructuraPublicacion);