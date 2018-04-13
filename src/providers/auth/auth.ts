import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  currentUser;

  constructor(private afdb: AngularFireDatabase, private afAuth:AngularFireAuth, public http: HttpClient) {
    console.log('Hello AuthProvider Provider');

    // TESTING GETTING LOGGED IN USER!
    // this.afAuth.authState.subscribe( (user) => {
    //   if (user) {
    //     console.log('user found' + JSON.stringify(user));
    //     this.currentUser = user.uid;
    //   }else{
    //     console.log('user currently logout');
    //   }
    // });
  }

  loginUser(email,password){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  logoutUser(){
    return this.afAuth.auth.signOut();
  }

  registerUser(user){
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
  }

}
