import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page],
  providers:[SMS]
})
export class Tab2PageModule {}
