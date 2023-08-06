//craeremos el molde de la estructura de los datos que manejaremos en Avisos
//por ahora nos faltaria añadir comunidad y tipo a la interfaz de aviso NO OLVIDAR!!
//esta interfaz la añadiremos al servicio de los avisos
export interface AvisosCreados {
  ok: boolean;
  pagina: number;
  avisosPublicados: Avisos[];
}

export interface Avisos {
  imagenAviso?: string[];
  _id?: string;
  titulo?: string;
  descripcion?: string;
  usuario?: Usuario;
  fechaCreacion?: string;
  comunidad?: Comunidad;
  tipoAviso?: number;
  estadoAviso?: number;
}

export interface Usuario {
  _id?: string;
  nombre?: string;
  fechaNacimiento?: string;
  email?: string;
  password?: string;
  imagenPerfil?: string;
  rut?: string;
  direccion?: string;
  rol?: number[];
  comunidad?: Comunidad[];
}

export interface Comunidad{
  _id?: string;
  nombreComunidad?: string;
  descripcion?: string;
  coordenadas?: string;
  region?: string;
  comuna?: string;
  emitirCertificado?: number;

}

export interface AcuerdosCreados {
  ok: boolean;
  pagina: number;
  acuerdosPublicados: Acuerdos[];
}

export interface Acuerdos {
  _id?: string;
  titulo?: string;
  descripcion?: string;
  fecha?: string;
  hora?: string;
  duracion?: number;
  fechaLanzada?: number;
  imagenAcuerdo?: string[];
  opciones?: Object;
  votantes?: string[];
  usuario?: Usuario;
  comunidad?: Comunidad;
  estado?: number;

}

export interface Solicitud{
  _id?: string;
  usuario?: Usuario;
  comunidad?: Comunidad;
  mensaje?: string;
}


export interface CertificadosCreados {
  certificados: Certificado[];
  ok: boolean;
}

export interface Certificado {
  _id?: string;
  titulo?: string;
  descripcion?: string;
  replegal?: string;
  contacto?: string;
  logo?: string[];
  comunidad?: Comunidad;
}

export interface EmisorCreados {
  ok: boolean;
  pagina: number;
  emisor: Emisor[];
}

export interface Emisor {
  _id?: string;
  usuario?: Usuario;
  rut?: string;
  motivo?: string;
  fechaemision?: string;
  certificado?: Certificado;
  comunidad?: Comunidad;
  estado?: number;
}

export interface RespuestaComunidad {
  puedeEmitir: number;
}

export interface PublicacionesCreadas {
  publicaciones: Publicacion[];
  ok: boolean;
}

export interface Publicacion{
  _id?: string;
  titulo: string;
  descripcion: string;
  imagenes: string[];
  precio: number;
  categoria: string;
  usuarioId?: Usuario;
  comunidadId?: Comunidad;
  estado?: string;
  fechaCreacion?: string;
}
