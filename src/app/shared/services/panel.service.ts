import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Facility } from 'src/app/model/Facility';
import { Panel } from 'src/app/model/Panel';

import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class PanelService {
  private get isAdmin() {
    return this.adminService.isAdmin;
  }

  constructor(
    private adminService: AdminService,
    private firestore: AngularFirestore
  ) {}

  /**
   * Gets list of panels that take place in the future.
   * @returns List of panels
   */
  getCurrentPanels(): Observable<Panel[]> {
    return this.firestore
      .collection('Panels', (ref) => ref.where('eventTime', '>', new Date()))
      .snapshotChanges()
      .pipe(
        map((data) => {
          return this.getMappedData(data) as Panel[];
        })
      );
  }

  /**
   * Gets list of panels that have openings in the future.
   * @returns List of panels
   */
  getOpenPanels(): Observable<Panel[]> {
    return this.firestore
      .collection('Panels', (ref) =>
        ref
          .where('eventTime', '>', new Date())
          .where('panelMemberCount', '<', 'numberNeeded')
      )
      .snapshotChanges()
      .pipe(
        map((data) => {
          return this.getMappedData(data) as Panel[];
        }),
      );
  }

  addPanel(admin: Panel) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Panels').add({ ...admin }));
        }
        return of(undefined);
      })
    );
  }

  updatePanel(id: string, member: Panel) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Panels').doc(id).update(member));
        }
        return of(undefined);
      })
    );
  }

  deletePanel(id: string) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Panels').doc(id).delete());
        }
        return of(undefined);
      })
    );
  }

  private getMappedData(data: any) {
    return data.map((e) => {
      return {
        id: e.payload.doc.id,
        // @ts-ignore
        ...e.payload.doc.data(),
      } as any;
    });
  }
}
