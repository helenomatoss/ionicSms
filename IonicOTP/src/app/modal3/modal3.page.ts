import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal3.page.html',
  styleUrls: ['./modal3.page.scss'],
})
export class Modal3Page implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
