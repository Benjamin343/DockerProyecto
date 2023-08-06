import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestCertPage } from './gest-cert.page';

const routes: Routes = [
  {
    path: '',
    component: GestCertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestCertPageRoutingModule {}
