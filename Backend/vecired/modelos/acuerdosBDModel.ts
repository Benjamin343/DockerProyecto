
import {Schema, Document, model} from 'mongoose';

const estructuraAcuerdos = new Schema({

        titulo: {
            type: String,
            required: [true, 'El titulo es obligatorio']
        },
        descripcion: {
            type: String,
            required: [true, 'La descripcion es obligatoria']
        },
        fecha: {
            type: String
        },
        hora:{
           type: String
        },
        duracion:{
            type: Number
        },
        fechaLanzada:{
            type: Number
        },
        imagenAcuerdo: [{
            type: String
        }],
        opciones:[{
            titulo: {
                type: String,
                //required: [true, 'El titulo es obligatorio']
            },
            descripcion: {
                type: String,
                //required: [true, 'La descripcion es obligatoria']
            },
            votos:{
                type: Number
            }
        }],
        votantes:[{
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }],
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
            //required: [true, 'Los avisos deben ser realizados por un miembro']
        },
        comunidad:{
            type: Schema.Types.ObjectId,
            ref: 'Comunidad'
            //required: [true, 'Los acuerdos deben pertenecer a una comunidad']
        },
        estado:{
            type: Number
        }
    
});

interface IAcuerdos extends Document{

    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string;
    duracion: number;
    fechaLanzada: number;
    imagenAcuerdo: string;
    opciones: IOpciones[];
    votantes: string[];
    usuario: string;
    comunidad: string;
    estado: number;
    
}


interface IOpciones extends Document{

    titulo: string;
    descripcion: string;
    votos: number;
}

export const Acuerdos= model <IAcuerdos>('Acuerdos', estructuraAcuerdos);