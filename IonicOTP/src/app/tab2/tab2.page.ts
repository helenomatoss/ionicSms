import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  phoneNumber: number;
  textMessage: string;

  constructor(private sms: SMS, private toast: ToastController, public navCtrl: NavController) {

  }
  async sendTextMessage(){
    try{
      await this.sms.send(String(this.phoneNumber),this.textMessage);
      const toast = this.toast.create({
        message: 'Text was sent',
        duration: 3000
      });
      (await toast).present();

    }
    catch(e){
      const toast = this.toast.create({
        message: 'Text was not send',
        duration: 3000
      });
      (await toast).present();
    }
  }

}
