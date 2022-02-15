import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  phoneNumber: number;
  textMessage: string;

  constructor(private sms: SMS, private toast: ToastController, public navCtrl: NavController, private androidPermissions: AndroidPermissions) {



  }
  async sendTextMessage() {
    try {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS]);

      await this.sms.send(String(this.phoneNumber), this.textMessage);
      const toast = this.toast.create({
        message: 'Text was sent',
        duration: 3000
      });
      (await toast).present();

    }
    catch (e) {
      const toast = this.toast.create({
        message: 'Text was not send',
        duration: 3000
      });
      (await toast).present();
    }
  }
  sendTxt() {
    var messageInfo = {
        phoneNumber: "xxxxxxxxxx",
        textMessage: "This is a test message"
      };
      this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
          // sms.sendMessage(messageInfo, function(message) {
          //     alert(message);
          // }, function(error) {
          //     alert(error);
         //});
      }).catch((err) => {
          alert(JSON.stringify(err));
      });

};
}
