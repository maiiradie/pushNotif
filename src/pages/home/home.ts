import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotifProvider } from '../../providers/notif/notif';
import { AuthProvider} from '../../providers/auth/auth';
// import firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  uid;
  token;
  notif;

  constructor(private afAuth:AngularFireAuth,private authProvider:AuthProvider,private fcm:FCM,private notifProvider:NotifProvider,public navCtrl: NavController, public afdb: AngularFireDatabase) {
    this.uid = this.afAuth.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    this.fcm.getToken().then(token => {
        this.afdb.object('tokens/' + this.uid).set({
          token:token
        }).then( () => {
          this.token = token;
        });
      alert("this is get token");
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        alert("Received in background" + JSON.stringify(data));
      } else {
        alert("Received in foreground" + JSON.stringify(data));
      };
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.afdb.object('tokens/' + this.uid).update({
        token: token
      });
      alert("this is on token refresh");
    });
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
