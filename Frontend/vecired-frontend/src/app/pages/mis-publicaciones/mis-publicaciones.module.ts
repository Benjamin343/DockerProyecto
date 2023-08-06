import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisPublicacionesPageRoutingModule } from './mis-publicaciones-routing.module';

import { MisPublicacionesPage } from './mis-publicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisPublicacionesPageRoutingModule
  ],
  declarations: [MisPublicacionesPage]
})
export class MisPublicacionesPageModule {}
