import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { TsManagerProvider } from '../../providers/ts-manager/ts-manager';

@Component({
    selector: 'modal-details',
    templateUrl: 'modal-details.html'
})
export class detailsModal {
    public parameters;
    public timeSheet;
    constructor(public tsManagerProvider: TsManagerProvider,
        public navCtrl: NavController,
        public params: NavParams, ) {
        this.parameters = params;
    }

    ionViewDidEnter() {
        console.log("Details");
        this.tsManagerProvider.getWithId(this.parameters.data.userId).then((result) => {
            console.log(result);
            this.timeSheet = result;
        });
    }

    closeModal() {
        this.navCtrl.pop();
    }
}