import { Component, OnInit, Input } from '@angular/core';
import { Certificado } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-certificado-creado',
  templateUrl: './certificado-creado.component.html',
  styleUrls: ['./certificado-creado.component.scss'],
})
export class CertificadoCreadoComponent implements OnInit {
  @Input() certificado: Certificado = {
    titulo: '',
    descripcion: '',
    replegal: '',
    contacto: '',
    logo: [],
    comunidad: {}
  };
  constructor() { }

  ngOnInit() {
  }

}
