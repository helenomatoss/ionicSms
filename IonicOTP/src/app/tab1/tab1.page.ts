import { Component, OnInit } from '@angular/core';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  hash: any;

  constructor(private smsRetriever: SmsRetriever) { }
  ngOnInit(): void {
      
  }
  genHash() {
   
    this.smsRetriever.getAppHash()
      .then((res: any) => {
        this.hash = res;
      })
      .catch((error: any) => console.error(error));
  }


  retriveSMS() {
    this.smsRetriever.startWatching()
      .then((res: any) => {
        const otp = res.Message.toString().substr(4, 6);
      })
      .catch((error: any) => console.error(error));
  }

}
