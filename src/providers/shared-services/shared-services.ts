import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the SharedServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedServicesProvider {

  constructor(public http: HttpClient,
    private toastCtrl: ToastController
  ) {
    console.log('Hello SharedServicesProvider Provider');
  }

  presentToast(toastMessage) {
    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
