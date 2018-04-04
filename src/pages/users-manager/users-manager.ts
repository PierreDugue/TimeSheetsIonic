import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { parentsDatas } from '../../app/models/parentsDatas-model';
import { ToastController } from 'ionic-angular';

import { DataManagerProvider } from "../../providers/data-manager/data-manager"

@Component({
  selector: 'page-user-manager',
  templateUrl: 'users-manager.html'
})
export class UserManagerPage {

  public datasForm: FormGroup;
  public parentsDatas: parentsDatas;
  public parentsDatasCtrl;
  public response;
  public parentList;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public dataManagerProvider: DataManagerProvider,
    private toastCtrl: ToastController) {

    this.parentsDatasCtrl = {} as FormControl;

    this.parentsDatasCtrl.parentName = formBuilder.control('', Validators.required);
    this.parentsDatasCtrl.parentSurname = formBuilder.control('', Validators.required);
    this.parentsDatasCtrl.childrenSurname = formBuilder.control('', Validators.required);

    this.datasForm = this.formBuilder.group({
      parentName: this.parentsDatasCtrl.parentName,
      parentSurname: this.parentsDatasCtrl.parentSurname,
      childrenSurname: this.parentsDatasCtrl.childrenSurname,
    });
  }

  ionViewDidLoad() {
    this.parentsDatas = new parentsDatas();
  }

  ionViewDidEnter() {
    this.dataManagerProvider.createPouchDB();

    this.dataManagerProvider.getAll()
      .then(res => {
        this.parentList = res;
      })
      .catch((err) => { });

  }
  onSubmit() {
    this.dataManagerProvider.create(this.datasForm.value).then(
      res => {
        this.response = res;
        console.log(res);
        if(this.response.ok){
          this.presentToast();
        }
      }).catch(() => { });

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Parent was added successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
