import { Component, Input, OnInit } from '@angular/core';
import { Certificado } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss'],
})
export class CertificadoComponent implements OnInit {
  @Input() certificados: Certificado[] = [];
  constructor() { }

  ngOnInit() {
    //console.log(this.certificados);
  }

}
