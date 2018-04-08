import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
/*
  Generated class for the NotifProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotifProvider {

  constructor(private afdb:AngularFireDatabase, private afAuth:AngularFireAuth,public http: HttpClient) {
  }

  sendRequest(token){
      let body = {
        "notification": {
          "title": "You have a parking request!",
          "body": "",
          "sound": "default",
          "click_action": "FCM_PLUGIN_ACTIVITY",
          "icon": "fcm_push_icon"
        },
        "data": {
          "coID": "",
          "hoToken": "",
          "hoID": ""
        },
        "to": token,
        "priority": "high",
        "restricted_package_name": ""
      };

      let options = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.post("https://fcm.googleapis.com/fcm/send", body, {
        headers: options.set('Authorization', 'key=AAAAt9fKjic:APA91bElNAf1Tei6PzVmS1ki1rwEnJANXwG5MhNpDwrjpnsUyOOYMc_L7Z16rm1yLjjFb5-TXLGwHWR7RsZzwe5bmxLwcw-OvWpA2HSn7gV5frUa0V03jbQbT6I_JpB-deO52m7PrAl-'),
      }).subscribe();
  }






}
