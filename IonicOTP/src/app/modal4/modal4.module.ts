import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modal4PageRoutingModule } from './modal4-routing.module';

import { Modal4Page } from './modal4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Modal4PageRoutingModule
  ],
  declarations: [Modal4Page]
})
export class Modal4PageModule {}