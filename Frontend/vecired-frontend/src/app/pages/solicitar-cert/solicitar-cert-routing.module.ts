import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitarCertPage } from './solicitar-cert.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarCertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarCertPageRoutingModule {}
