import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal4',
  templateUrl: './modal4.page.html',
  styleUrls: ['./modal4.page.scss'],
})
export class Modal4Page implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }


}
