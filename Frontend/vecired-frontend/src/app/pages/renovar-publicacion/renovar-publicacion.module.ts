import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenovarPublicacionPageRoutingModule } from './renovar-publicacion-routing.module';

import { RenovarPublicacionPage } from './renovar-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenovarPublicacionPageRoutingModule
  ],
  declarations: [RenovarPublicacionPage]
})
export class RenovarPublicacionPageModule {}
