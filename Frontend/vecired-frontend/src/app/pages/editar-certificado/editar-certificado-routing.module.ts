import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCertificadoPage } from './editar-certificado.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCertificadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCertificadoPageRoutingModule {}
