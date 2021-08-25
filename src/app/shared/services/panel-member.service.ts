import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AdminMember } from 'src/app/model/AdminMember';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class PanelMemberService {
  private get isAdmin() {
    return this.adminService.isAdmin;
  }

  constructor(
    private adminService: AdminService,
    private firestore: AngularFirestore
  ) {}

  getPanelMembers() {
    return this.getMembers('Panel Members');
  }

  addPanelMember(admin: AdminMember) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Panel Members').add({ ...admin }));
        }
        return of(undefined);
      })
    );
  }

  updatePanelMember(id: string, member: AdminMember) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Panel Members').doc(id).update(member));
        }
        return of(undefined);
      })
    );
  }

  deletePanelMember(id: string) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Panel Members').doc(id).delete());
        }
        return of(undefined);
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
}
