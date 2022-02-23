import { ModalPage } from './../modal/modal.page';
import { Component } from '@angular/core';
import { AlertController, NavController, ToastController, ModalController } from '@ionic/angular';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Modal2Page } from '../modal2/modal2.page';
import { Modal3Page } from '../modal3/modal3.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  phoneNumber: number;
  textMessage: string;

  constructor(private sms: SMS, private toast: ToastController, public navCtrl: NavController,
     private androidPermissions: AndroidPermissions,private alerCtrl: AlertController, private modalCtrl: ModalController ) {



  }
  async sendTextMessage() {
    try {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS]);

      await this.sms.send(String(this.phoneNumber), this.textMessage);




      // const toast = this.toast.create({
      //   message: 'Text was sent',
      //   duration: 3000
      // });
      // (await toast).present();

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
  async showAlert() {
    const myAlert = await this.alerCtrl.create({
      header:'! Alerta !',
      subHeader:'',
      message: 'você está agredindo a moda',

      buttons: ['OK', 'CANCELAR']
    });

    myAlert.present();
  }

  async showModal(){
    console.log('showModal()');
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-modal1'
    });
    await modal.present();
  }
  async showModal2(){
    console.log('showModal2()');
    const modal = await this.modalCtrl.create({
      component: Modal2Page,
      cssClass: 'my-custom-modal1'
    });
    await modal.present();
  }
  async showModal3(){
    console.log('showModal3()');
    const modal = await this.modalCtrl.create({
      component: Modal3Page,
      cssClass: 'my-custom-modal1'
    });
    await modal.present();
  }

  


}
