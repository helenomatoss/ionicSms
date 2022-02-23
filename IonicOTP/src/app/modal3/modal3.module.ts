import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modal3PageRoutingModule } from './modal3-routing.module';

import { Modal3Page } from './modal3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Modal3PageRoutingModule
  ],
  declarations: [Modal3Page]
})
export class Modal3PageModule {}
