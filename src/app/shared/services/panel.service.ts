import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
      .collection('Panels', (ref) => ref.where('eventDate', '>', new Date()))
      .snapshotChanges()
      .pipe(
        switchMap((data) => {
          return this.getMappedData$(data);
        }),
      );
  }

  /**
   * Gets list of panels that have openings in the future.
   * @returns List of panels
   */
  getOpenPanels(): Observable<Panel[]> {
    return this.getCurrentPanels().pipe(
      map((panels) => {
        return panels.filter((p) => p.numberNeeded < p.panelMembers.length);
      })
    );
  }

  addPanel(panel: Panel) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          const data = this.getPanelData(panel);
          return from(this.firestore.collection('Panels').add(data));
        }
        return of(undefined);
      })
    );
  }

  updatePanel(id: string, panel: Panel) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          const data = this.getPanelData(panel);
          return from(this.firestore.collection('Panels').doc(id).update(data));
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

  private getPanelData(panel: any) {
    const data = { ...panel } as any;
    const facility = this.firestore
      .collection('Facilities')
      .doc(data.facilityId);
    const boardChampion = this.firestore
      .collection('Admin')
      .doc(data.boardChampionId);
    const panelCoordinator = this.firestore
      .collection('Panel')
      .doc(data.panelCoordinatorId);
    data.facility = facility ? facility.ref : undefined;
    data.boardChampion = boardChampion ? boardChampion.ref : undefined;
    data.panelCoordinator = panelCoordinator ? panelCoordinator.ref : undefined;
    return data;
  }

  private getMappedData$(data: any[]) {
    const panels$ = data.map(d => this.getMappedDataItem$(d));
    return forkJoin(panels$);
  }

  private getMappedDataItem$(data: any) {
    const panel = {
      id: data.payload.doc.id,
      // @ts-ignore
      ...data.payload.doc.data(),
    } as any;

    if (panel.eventDate) {
      const timeStamp = panel.eventDate.seconds;
      panel.eventDate = new Date(timeStamp * 1000);
    }

    let facility$ = of(undefined);
    let admin$ = of(undefined);
    let member$ = of(undefined);

    if (panel.facility) {
      facility$ = this.firestore
        .collection('Facilities')
        .doc(panel.facility.id)
        .get();
    }

    if (panel.boardChampion) {
      admin$ = this.firestore
        .collection('Admin')
        .doc(panel.boardChampion.id)
        .get();
    }

    if (panel.panelCoordinator) {
      member$ = this.firestore
        .collection('Panel')
        .doc(panel.panelCoordinator.id)
        .get();
    }

    return combineLatest([facility$, admin$, member$]).pipe(
      map(([facility, admin, member]) => {
        panel.facility = {
          ...facility.data(),
          id: facility.id,
        };
        panel.boardChampion = {
          ...admin.data(),
          id: admin.id,
        };
        panel.panelCoordinator = {
          ...member.data(),
          id: member.id,
        };
        return panel as Panel;
      })
    );
  }
}
