import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCertificadoPageRoutingModule } from './editar-certificado-routing.module';

import { EditarCertificadoPage } from './editar-certificado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCertificadoPageRoutingModule
  ],
  declarations: [EditarCertificadoPage]
})
export class EditarCertificadoPageModule {}
