import { ModalPage } from './../modal/modal.page';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  ToastController,
  ModalController
} from '@ionic/angular';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import {
  AndroidPermissions
} from '@awesome-cordova-plugins/android-permissions/ngx';
import { Modal2Page } from '../modal2/modal2.page';
import { Modal3Page } from '../modal3/modal3.page';
import { Storage } from '@capacitor/storage';
import * as moment from 'moment';

class TokenModal {

  token: String;
  dataExpiracao: String;

}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  phoneNumber: number;
  textMessage: string;
  conferirToken: string;
  numberToken: number;

  constructor(private sms: SMS, private toast: ToastController,
    private androidPermissions: AndroidPermissions,
    private alerCtrl: AlertController,
    private modalCtrl: ModalController) {



  }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    // this.setName();
    // this.checkName();

  }

  ionViewWillLeave() {
    // this.removeName();
  }

  async sendTextMessage() {
    await this.checkPermission();
  }


  async showModal() {
    console.log('showModal()');
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-modal1',
      componentProps: {
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
  async showToast() {
    const toast = this.toast.create({
      message: 'Text was not send',
      duration: 3000
    });
    (await toast).present();
  }

  async checkPermission() {

    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.SEND_SMS).then(
        result => {
          console.log('Has permission?', result.hasPermission)
          if (result.hasPermission) {
            this.sendSms();
            return;
          } else {
            this.showModal3()
            return;
          }
        },
        () => this.androidPermissions.requestPermission(
          this.androidPermissions.PERMISSION.SEND_SMS)
      );
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.SEND_SMS]);
  }

  async sendSms() {

    this.numberToken = this.randomToken();
    this.textMessage = `Seu token de segurança é: ${this.numberToken}`;
    await this.sms.send(String(this.phoneNumber), this.textMessage).then(result => {
      console.log('resultado do envio: ', result);

      if (result) {
        this.showModal();
        this.setName(this.numberToken);
      }
    }).catch(() => {
      this.showModal2();
    });
  }

  randomToken() {

    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

  }

  async setName(numeroToken: number) {

    let tokenModal = new TokenModal();
    tokenModal.token = numeroToken.toString();
    tokenModal.dataExpiracao = this.formatDateExp();
    let valorJson = JSON.stringify(tokenModal);
    await Storage.set({
      key: 'Token',
      value: valorJson,
    });
    
  
    
  };

  validacao(){

    this.checkName().then(result => {

      let validacao = result;
    console.log(validacao.token)

    let dataHoraAtual = moment(new Date()).format('DD-MM-YYYY HH:mm').toString();
  //  console.log("console1",dataHoraAtual);
  //  console.log("console2",validacao.dataExpiracao);

    if(validacao.token == this.conferirToken && validacao.dataExpiracao >= dataHoraAtual){
      console.log("ta certinho");
      this.removeName();

    }else{
      console.log("foi n, tenta dnv");
    }

    })
    

  }

  async checkName() {

    const { value } = await Storage.get({ key: 'Token' });
    let tokenModal: TokenModal = JSON.parse(value);
    console.log(`${tokenModal.token}`);
    return tokenModal;
  };

  async removeName() {
    await Storage.remove({ key: 'Token' });
  };


  formatDateExp() {
    const MINUTOS = '120';
    let dataInicial = new Date();
    return moment(dataInicial, 'HH:mm:ss').add(MINUTOS, 'minutes').format('DD-MM-YYYY HH:mm');
  }

  
  

}
