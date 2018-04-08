import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FCM } from '@ionic-native/fcm';
import { HttpClientModule } from '@angular/common/http';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NotifProvider } from '../providers/notif/notif';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotifProvider,
    AuthProvider
  ]
})
export class AppModule {}
