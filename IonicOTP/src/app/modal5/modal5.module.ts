import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Modal5PageRoutingModule } from './modal5-routing.module';

import { Modal5Page } from './modal5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Modal5PageRoutingModule
  ],
  declarations: [Modal5Page]
})
export class Modal5PageModule {}
