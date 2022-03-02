import { ModalPage } from './../modal/modal.page';
import { Component } from '@angular/core';
import { 
  AlertController, 
  NavController, 
  ToastController, 
  ModalController } from '@ionic/angular';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { 
  AndroidPermissions
} from '@awesome-cordova-plugins/android-permissions/ngx';
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

  constructor(private sms: SMS, private toast: ToastController,
              private androidPermissions: AndroidPermissions,
              private alerCtrl: AlertController, 
              private modalCtrl: ModalController) {



  }
  async sendTextMessage() {
    try {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(
        result => console.log('Has permission?', result.hasPermission),
        () => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SEND_SMS]);

      await this.sms.send(String(this.phoneNumber), this.textMessage).then(result =>{
        console.log('resultado do envio: ',result);
        
        if(result){
          this.showModal();
        }
      }).catch(() =>{
        this.showModal2();
      });

    }
    catch (e) {
       await this.showModal3();
    }
  }

  sendTxt() {
    
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      //colocar metodo de envio
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  };
  async showAlert() {
    const myAlert = await this.alerCtrl.create({
      header: '! Alerta !',
      subHeader: 'Mensagem não enviada',
      message: 'VOcê pode estar sem credito',

      buttons: ['OK', 'CANCELAR']
    });

    myAlert.present();
  }

  async showModal() {
    console.log('showModal()');
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-modal1',
      componentProps:{
      }
    });
    await modal.present();
  }
  async showModal2() {
    console.log('showModal2()');
    const modal = await this.modalCtrl.create({
      component: Modal2Page,
      cssClass: 'my-custom-modal1'
    });
    await modal.present();
  }
  async showModal3() {
    console.log('showModal3()');
    const modal = await this.modalCtrl.create({
      component: Modal3Page,
      cssClass: 'my-custom-modal1'
    });
    await modal.present();
  }
  async showToast(){
    const toast = this.toast.create({
      message: 'Text was not send',
      duration: 3000
    });
    (await toast).present();
  }




}
