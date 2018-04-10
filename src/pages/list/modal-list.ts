import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DataManagerProvider } from '../../providers/data-manager/data-manager';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { parentsDatas } from '../../app/models/parentsDatas-model';

@Component({
    selector: 'modal-list',
    templateUrl: 'modal-list.html'
})
export class ModalList {
    public datas;
    public parent = {
        parentSurname: '',
        parentName: '',
        childrenSurname: ''
    };
    public datasForm: FormGroup;
    public parentsDatas: parentsDatas;
    public parentsDatasCtrl;
    public response;
    public parentList;
    public errorLog;

    constructor(public navCtrl: NavController,
        public dataManagerProvider: DataManagerProvider,
        params: NavParams,
        private formBuilder: FormBuilder,
        private toastCtrl: ToastController,
        public alertCtrl: AlertController) {
        this.datas = params;
        console.log(this.datas);
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

    ionViewDidEnter() {
        if (this.datas.data.userId) {
            this.dataManagerProvider.getWithId(this.datas.data.userId).then((result) => {
                console.log(result);
                this.parent = result;
            });
        }
    }

    onSubmit() {
        if (!this.datas.data.userId) {
            this.dataManagerProvider.create(this.datasForm.value).then(
                res => {
                    this.response = res;
                    console.log("CREATE", res);
                    if (this.response.ok) {
                        this.presentToast();
                    }
                }).catch((err) => { this.errorLog = err; });
        } else {
            this.parent.parentName = this.datasForm.value.parentName;
            this.parent.parentSurname = this.datasForm.value.parentSurname;
            this.parent.childrenSurname = this.datasForm.value.childrenSurname;
            this.presentConfirm(this.parent);
        }
        this.closeModal();
    }


    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Parent was added successfully',
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
    }

    closeModal() {
        this.navCtrl.pop();
    }

    presentConfirm(parent) {
        let alert = this.alertCtrl.create({
            title: 'Confirm update',
            message: 'Do you want to update this parent?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Update',
                    handler: () => {
                        this.update(parent);
                    }
                }
            ]
        });
        alert.present();
    }

    update(parent) {
        this.dataManagerProvider.update(parent).then(
            res => {
                this.response = res;
                console.log("UPDATE", res);
                if (this.response.ok) {
                    this.presentToast();
                }
            }).catch((err) => {
                console.log(err);
            });
    }
}