import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { parentsDatas } from '../../app/models/parentsDatas-model';
import { ToastController } from 'ionic-angular';
import { ModalList } from './modal-list'
import { AlertController } from 'ionic-angular';

import { DataManagerProvider } from "../../providers/data-manager/data-manager"

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public parentsDatas: parentsDatas;
  public response;
  public parentList;

  constructor(public navCtrl: NavController,
    public dataManagerProvider: DataManagerProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.parentsDatas = new parentsDatas();
  }

  ionViewDidEnter() {
    this.dataManagerProvider.getAll()
      .then(res => {
        this.parentList = res;
      })
      .catch((err) => { });

  }

  /**
   * Delete parent
   * @param parent the parent to delete
   */
  deleteUser(parent) {
    this.dataManagerProvider.delete(parent).then(res => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Function calling ModalList. Sending the id of user to update
   * if already existing
   * @param id 
   */
  presentProfileModal(id) {
    let profileModal;
    if (id) {
      profileModal = this.modalCtrl.create(ModalList, { userId: id });
    } else {
      profileModal = this.modalCtrl.create(ModalList);
    }
    profileModal.present();
  }

  /**
   * Function managing the toasts
   */
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Parent was added successfully',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  /**
   * Confirm box calling Delete User
   * @param parent : the parent to delete
   */
  presentConfirm(parent) {
    let alert = this.alertCtrl.create({
      title: 'Confirm suppression',
      message: 'Do you want to delete this parent?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Buy clicked');
            this.deleteUser(parent);
          }
        }
      ]
    });
    alert.present();
  }
}
