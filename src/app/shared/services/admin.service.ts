import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AdminMember } from 'src/app/model/AdminMember';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private firestore: AngularFirestore) {}

  get isAdmin() {
    return from(this.getCurrentUser()).pipe(
      switchMap((user) => {
        if (user) {
          return this.isEmailAdmin(user.email);
        }
        return of(undefined);
      })
    );
  }

  isEmailAdmin(email: string) {
    const admin = this.firestore.collection('Admin', (ref) =>
      ref.where('email', '==', email)
    );
    return admin.snapshotChanges().pipe(
      map((users) => {
        return users.length > 0;
      })
    );
  }

  getSpecificAdmin(email: string){
    return this.getMember("Admin", email)
  }

  getAdminList() {
    return this.getMembers('Admin');
  }

  addAdminMember(admin: AdminMember) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Admin').add({ ...admin }));
        }
        return of(undefined);
      })
    );
  }

  updateAdminMember(id: string, member: AdminMember) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Admin').doc(id).update(member));
        }
        return of(undefined);
      })
    );
  }

  deleteAdminMember(id: string) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Admin').doc(id).delete());
        }
        return of(undefined);
      })
    );
  }

  private getMember(resourceType: string, email: string) {
    return this.firestore
      .collection(resourceType, ref => ref.where("email", "==", email))
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((e) => {
            return {
              id: e.payload.doc.id,
              // @ts-ignore
              ...e.payload.doc.data(),
            } as AdminMember;
          });
        })
      );
  }

  private getMembers(resourceType: string) {
    return this.firestore
      .collection(resourceType)
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((e) => {
            return {
              id: e.payload.doc.id,
              // @ts-ignore
              ...e.payload.doc.data(),
            } as AdminMember;
          });
        })
      );
  }

  private getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line:no-shadowed-variable
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject(undefined);
        }
      });
    });
  }
}
