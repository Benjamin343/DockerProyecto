import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { PublicacionesCreadas, Publicacion } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})

export class PublicacionService {
  nuevaPublicacion = new EventEmitter<Publicacion>();

  constructor( private http: HttpClient,
               private usuarioService: UsuarioService) { }

  getPublicaciones(){

    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    return this.http.get<PublicacionesCreadas[]>(`${URL}/publicacion/`, { headers });

  }

  crearPublicacion(publicacion){

    const headers = new HttpHeaders({
      'UToken': this.usuarioService.userToken
    });

    return new Promise( resolve =>{

      this.http.post(`${URL}/publicacion/crear`, publicacion, {headers}).subscribe( respuesta =>{
        console.log(respuesta);
        this.nuevaPublicacion.emit(respuesta['publicacion']);
        resolve(true);
      });

    });

  }



}
