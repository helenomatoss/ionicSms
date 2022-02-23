import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modal2PageRoutingModule } from './modal2-routing.module';

import { Modal2Page } from './modal2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Modal2PageRoutingModule
  ],
  declarations: [Modal2Page]
})
export class Modal2PageModule {}
