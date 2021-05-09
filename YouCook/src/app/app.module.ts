import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {FormPageModule} from './form/form.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: "AIzaSyAyhIJl4xttQMyfYwytf0EW4xt3q2N9isM",
  authDomain: "youcook-c3088.firebaseapp.com",
  databaseURL: "https://youcook-c3088-default-rtdb.firebaseio.com/",
  projectId: "youcook-c3088",
  storageBucket: "youcook-c3088.appspot.com",
  messagingSenderId: "678417005657",
  appId: "1:678417005657:web:ff1c26e5b4294437770548"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, FormPageModule,
    HttpClientModule],
    providers: [StatusBar, SplashScreen, BarcodeScanner,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
  })




export class AppModule {}
