import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotifProvider } from '../../providers/notif/notif';
import firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(private fcm:FCM,private notifProvider:NotifProvider,public navCtrl: NavController, public afdb: AngularFireDatabase) {
  }

  token;
  

  ionViewDidLoad() {

    this.fcm.getToken().then(token => {
        this.afdb.object('tokens').set({
          token:token
        }).then( () => {
          this.token = token;
        });
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        alert("Received in background");
      } else {
        alert("Received in foreground");
      };
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.afdb.object('tokens').update({
        token: token
      });
    });
  }

  sendNotif(){
    this.notifProvider.sendRequest(this.token);
  }

}
