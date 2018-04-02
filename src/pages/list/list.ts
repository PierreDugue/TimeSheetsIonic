import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { parentsDatas } from '../../app/models/parentsDatas-model';

import { DataManagerProvider } from "../../providers/data-manager/data-manager"

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public datasForm: FormGroup;
  public parentsDatas: parentsDatas;
  public parentsDatasCtrl;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public dataManagerProvider: DataManagerProvider) {

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
    // this.dataManagerProvider.getData();
  }

  ionViewWillEnter() {
    // this.dataManagerProvider.getData();
  }

}
