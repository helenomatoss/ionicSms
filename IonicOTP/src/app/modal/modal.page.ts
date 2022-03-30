import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { StatusCodeEnum } from '../enum/status-code-enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  message: string;
  statusCode: number;
  icon: string = '';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    this.icon = this.loadIcon(this.statusCode);

  }
    
  

  loadIcon(code: number):string{
    
  let baseUrl = 'assets/icon/';
  return code === StatusCodeEnum.ATENCAO ? baseUrl+'alerta.png': 
  code < StatusCodeEnum.ATENCAO ? baseUrl+'check.png': baseUrl+'Erro.png';
    
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
