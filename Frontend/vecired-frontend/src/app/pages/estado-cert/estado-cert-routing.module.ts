import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoCertPage } from './estado-cert.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoCertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoCertPageRoutingModule {}
