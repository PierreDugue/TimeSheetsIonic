import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { parentsDatas } from '../../app/models/parentsDatas-model';
import { ToastController } from 'ionic-angular';
import { TsManagerProvider } from '../../providers/ts-manager/ts-manager';
import { ts } from '../../app/models/ts-model';
import { detailsModal } from './modal-details';
import { GroupByPipe } from '../../pipes/group-by/group-by';


@Component({
  selector: 'page-user-manager',
  templateUrl: 'users-manager.html'
})
export class UserManagerPage {
  private timeSheetDatas: ts;
  public drawer: boolean = false;
  
  constructor(public navCtrl: NavController,
    public tsManagerProvider: TsManagerProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController, ) {

  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.tsManagerProvider.getAll()
      .then(res => {
        this.timeSheetDatas = res;
        console.log(this.timeSheetDatas);
      })
      .catch((err) => { });
  }

/**
 * Calling the modal detailsModal.
 * @param id 
 */
  details(id) {
    let profileModal = this.modalCtrl.create(detailsModal, { userId: id });
    profileModal.present();
  }

  /**
   * Delete timesheet
   * @param ts
   */
  deleteTs(ts) {
    this.tsManagerProvider.delete(ts).then(res => {
      console.log(res);
    })
      .catch((err) => { });
  }
}
