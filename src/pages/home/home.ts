import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';
import { parentsDatas } from '../../app/models/parentsDatas-model';
import { DataManagerProvider } from '../../providers/data-manager/data-manager';
import { ts } from '../../app/models/ts-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public datasForm: FormGroup;
  public parentList;
  public timeSheet: ts = {
    parentName: '',
    arrivingTime: null,
    departureTime: null,
    signature: ''
  };
  public tsCtrl;
  public currentDate: Date = new Date();

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public dataManagerProvider: DataManagerProvider) {

    this.tsCtrl = {} as FormControl;

    this.tsCtrl.parentName = formBuilder.control('', Validators.required);
    this.tsCtrl.arrivingTime = formBuilder.control('', Validators.required);
    this.tsCtrl.departureTime = formBuilder.control('', Validators.required);

    this.datasForm = this.formBuilder.group({
      parentName: this.tsCtrl.parentName,
      arrivingTime: this.tsCtrl.arrivingTime,
      departureTime: this.tsCtrl.departureTime,
    });
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.dataManagerProvider.getAll()
      .then(res => {
        this.parentList = res;
        console.log(this.parentList);
      })
      .catch((err) => { });
  }

  onSubmit() {
    console.log(this.timeSheet);
  }
}
