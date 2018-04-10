import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataManagerProvider } from '../../providers/data-manager/data-manager';
import { ts } from '../../app/models/ts-model';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { TsManagerProvider } from '../../providers/ts-manager/ts-manager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public datasForm: FormGroup;
  public parentList;
  public currentDate: Date = new Date();
  public timeSheet: ts = {
    parentName: '',
    arrivingTime: null,
    departureTime: null,
    signature: '',
    currentDay: this.currentDate
  };
  public tsCtrl;

  private signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public dataManagerProvider: DataManagerProvider,
    public tsManagerProvider: TsManagerProvider) {

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

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
  }

  ionViewDidEnter() {
    this.dataManagerProvider.getAll()
      .then(res => {
        this.parentList = res;
        console.log(this.parentList);
      })
      .catch((err) => { });
  }

  /**
   * Save the timeSheet
   */
  onSubmit() {
    this.timeSheet.currentDay = this.currentDate;
    this.timeSheet.signature = this.signaturePad.toDataURL();
    console.log(this.timeSheet);
    this.tsManagerProvider.create(this.timeSheet).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clearPad() {
    this.signaturePad.clear();
  }

}
