import { Injectable } from "@angular/core";
/* import "rxjs/add/operator/toPromise"; */
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { AdminService } from "../shared/services/admin.service";
import { take } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    public afAuth: AngularFireAuth
  ) {}

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      this.afAuth.auth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  async doRegister(value) {
    const isAdmin = await this.adminService
      .isEmailAdmin(value.email)
      .pipe(take(1))
    if (isAdmin) {
      return new Promise<any>((resolve, reject) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(value.email, value.password)
          .then(
            (res) => {
              resolve(res);
            },
            (err) => reject(err)
          );
      });
    }

    return Promise.reject(undefined);
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise<void>((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}
