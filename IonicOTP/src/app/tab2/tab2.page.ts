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
import { Storage } from '@capacitor/storage';
import * as moment from 'moment';
import { StatusCodeEnum } from '../enum/status-code-enum';

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


  async sendTextMessage() {
    await this.checkPermission();
  }


  async showModal(message: string, statusCode: number) {
    console.log('showModal()');
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'my-custom-modal1',
      componentProps: {
        message,
        statusCode,
      }
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
            this.showModal("Mensagem não enviada, verifique as permissões do aplicativo", StatusCodeEnum.ERRO)
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
        this.showModal("Token Enviado com sucesso", StatusCodeEnum.SUCESSO);
        this.setName(this.numberToken);
      }
    }).catch(() => {
      this.showModal("Token não enviada, verifique se seu dispositivo contem um chip", StatusCodeEnum.ATENCAO);
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
    
    if(validacao.token == this.conferirToken && validacao.dataExpiracao >= dataHoraAtual){
      this.showModal("Token correto!!!!", StatusCodeEnum.SUCESSO);
      this.removeName();

    }else{
      this.showModal("token incorreto ou invalido", StatusCodeEnum.ERRO);
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
