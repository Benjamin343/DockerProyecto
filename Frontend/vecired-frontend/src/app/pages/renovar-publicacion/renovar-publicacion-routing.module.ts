import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenovarPublicacionPage } from './renovar-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: RenovarPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenovarPublicacionPageRoutingModule {}
