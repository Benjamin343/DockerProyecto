import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearCertPage } from './crear-cert.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearCertPageRoutingModule {}
