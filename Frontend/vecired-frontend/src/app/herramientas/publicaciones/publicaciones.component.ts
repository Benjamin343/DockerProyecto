import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  @Input() publicaciones: Publicacion = {
    titulo: '',
    descripcion: '',
    imagenes: [''],
    precio: 0,
    categoria: '',
    estado: '',
    fechaCreacion: '',
  };
  constructor() { }

  ngOnInit() {
    console.log(this.publicaciones);
  }

}
