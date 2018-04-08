import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotifProvider } from '../../providers/notif/notif';
import { AuthProvider} from '../../providers/auth/auth';
import firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(private authProvider:AuthProvider,private fcm:FCM,private notifProvider:NotifProvider,public navCtrl: NavController, public afdb: AngularFireDatabase) {
  }

  token;
  notif;
  

  ionViewDidLoad() {

    // this.fcm.getToken().then(token => {
    //     this.afdb.object('tokens').set({
    //       token:token
    //     }).then( () => {
    //       this.token = token;
    //     });
    // });

    // this.fcm.onNotification().subscribe(data => {
    //   if (data.wasTapped) {
    //     alert("Received in background" + data);
    //   } else {
    //     alert("Received in foreground" + data);
    //   };
    // });

    // this.fcm.onTokenRefresh().subscribe(token => {
    //   this.afdb.object('tokens').update({
    //     token: token
    //   });
    // });
  }

  sendNotif(){
    this.notifProvider.sendRequest(this.token);
  }

  onLogout(){
    this.authProvider.logoutUser()
    .then( () => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  // ionViewDidLeave() {
  //   this.notif.unsubscribe();
  // }

}
