import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { NotifProvider } from '../../providers/notif/notif';
import { AuthProvider} from '../../providers/auth/auth';
// import firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';
import { LoginPage } from '../login/login';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  uid;
  notif;
  //current logged in user token
  token;

  users:Observable<any[]>;

  constructor(public actionSheetCtrl: ActionSheetController, private afAuth:AngularFireAuth,private authProvider:AuthProvider,private fcm:FCM,private notifProvider:NotifProvider,public navCtrl: NavController, public afdb: AngularFireDatabase) {
    //?? where to put //working
    this.uid = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit(){
    this.users = this.getUsers();
  
  }

  ngOnDestroy(){
    console.log('this is ngondestory / unsubscribe here');
  }

  ionViewDidLoad() {
    this.fcm.getToken().then(token => {
        this.afdb.object('profiles/' + this.uid).update({
          token:token
        })
        //assign current token
        .then( () => {
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
    
    // trigger when?
    this.fcm.onTokenRefresh().subscribe(token => {
      this.afdb.object('tokens/' + this.uid).update({
        token: token
      });
      alert("this is on token refresh");
    });
  }



  sendNotif(){
    //unsubscribe POST here
    this.notifProvider.sendRequest(this.token);
  }

  onLogout(){
    this.authProvider.logoutUser()
    .then( () => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  userSelected(user){
      let actionSheet = this.actionSheetCtrl.create({
        title: user.payload.val().email,
        buttons: [
          {
            text: 'Request',
            handler: () => {
              alert(user.token);
              this.notifProvider.sendRequest(user.token);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });

      actionSheet.present();
  }

  getUsers() {
    return this.afdb.list<any>('profiles').snapshotChanges();

    //OR
    //BY USING SUBSCRIPTION 
    //Note* Needs to be unsubscribed onDestroy

    // users = [];
    //  this.getUsers();
    // subscription;


    // this.subscription = this.afdb.list<any>('profiles').snapshotChanges()
    // .subscribe( users => {
    //     this.users = users;
    // });

    // ngOnDestroy(){
    //   this.subscription.unsubscribe();
    // }

  }
}
