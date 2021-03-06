import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GroupByPipe } from '../pipes/group-by/group-by';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ModalList } from '../pages/list/modal-list'
import { UserManagerPage } from '../pages/users-manager/users-manager';
import { SignaturePadModule } from 'angular2-signaturepad';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataManagerProvider } from '../providers/data-manager/data-manager';
import { HttpModule } from '@angular/http';
import { TsManagerProvider } from '../providers/ts-manager/ts-manager';
import { detailsModal } from '../pages/users-manager/modal-details';
import { SharedServicesProvider } from '../providers/shared-services/shared-services';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    UserManagerPage, 
    ModalList,
    detailsModal,
    GroupByPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    UserManagerPage,
    ModalList,
    detailsModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    DataManagerProvider,
    TsManagerProvider,
    SharedServicesProvider
  ]
})
export class AppModule {}
