import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { DataManagerProvider } from '../../providers/data-manager/data-manager';

@Component({
    selector: 'modal-list',
    templateUrl: 'modal-list.html'
})
export class ModalList {
    public datas;
    constructor(public navCtrl: NavController,
        public dataManagerProvider: DataManagerProvider,
        params: NavParams) {
        this.datas = params;
        console.log(this.datas);
    }

    ionViewDidEnter() {
        
    }

    closeModal() {
        this.navCtrl.pop();
    }
}