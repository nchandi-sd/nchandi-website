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
   * Gets list of panels.
   * @returns List of panels
   */
  getPanels(): Observable<Panel[]> {
    return this.firestore
      .collection('Panels')
      .snapshotChanges()
      .pipe(
        switchMap((data) => {
          return this.getMappedData$(data);
        })
      );
  }

  /**
   * Gets list of panels that have openings in the future.
   * @returns List of panels
   */
  getOpenPanels(): Observable<Panel[]> {
    return this.firestore
      .collection('Panels', ref => ref.where("active", "==", true).where("markAsMembersNeeded", "==", true))
      .snapshotChanges()
      .pipe(
        switchMap((data) => {
          return this.getMappedData$(data);
        }),
        map((panels) => {
          return panels.filter((p) => p.markAsMembersNeeded);
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
      .collection('Members')
      .doc(data.boardChampionId);
    const panelCoordinator = this.firestore
      .collection('Members')
      .doc(data.panelCoordinatorId);

    let panelLeader;
    if (data.panelLeaderId && data.panelLeaderId.length > 0) {
      panelLeader = this.firestore
        .collection('Members')
        .doc(data.panelLeaderId);
    }
    let panelMember1;
    if (data.panelMember1Id && data.panelMember1Id.length > 0) {
      panelMember1 = this.firestore
        .collection('Members')
        .doc(data.panelMember1Id);
    }
    let panelMember2;
    if (data.panelMember2Id && data.panelMember2Id.length > 0) {
      panelMember2 = this.firestore
        .collection('Members')
        .doc(data.panelMember2Id);
    }
    let panelMember3;
    if (data.panelMember3Id && data.panelMember3Id.length > 0) {
      panelMember3 = this.firestore
        .collection('Members')
        .doc(data.panelMember3Id);
    }
    let panelMember4;
    if (data.panelMember4Id && data.panelMember4Id.length > 0) {
      panelMember4 = this.firestore
        .collection('Members')
        .doc(data.panelMember4Id);
    }
    let panelMember5;
    if (data.panelMember5Id && data.panelMember5Id.length > 0) {
      panelMember5 = this.firestore
        .collection('Members')
        .doc(data.panelMember5Id);
    }
    data.facility = facility ? facility.ref : undefined;
    data.boardChampion = boardChampion ? boardChampion.ref : undefined;
    data.panelCoordinator = panelCoordinator ? panelCoordinator.ref : undefined;
    data.panelLeader = panelLeader ? panelLeader.ref : undefined;
    data.panelMember1 = panelMember1 ? panelMember1.ref : undefined;
    data.panelMember2 = panelMember2 ? panelMember2.ref : undefined;
    data.panelMember3 = panelMember3 ? panelMember3.ref : undefined;
    data.panelMember4 = panelMember4 ? panelMember4.ref : undefined;
    data.panelMember5 = panelMember5 ? panelMember5.ref : undefined;
    return data;
  }

  private getMappedData$(data: any[]) {
    const panels$ = data.map((d) => this.getMappedDataItem$(d));
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
    let panelLeader$ = of(undefined);
    let panelMember1$ = of(undefined);
    let panelMember2$ = of(undefined);
    let panelMember3$ = of(undefined);
    let panelMember4$ = of(undefined);
    let panelMember5$ = of(undefined);

    if (panel.facility && panel.facility.id) {
      facility$ = this.firestore
        .collection('Facilities')
        .doc(panel.facility.id)
        .get();
    }

    if (panel.boardChampion && panel.boardChampion.id) {
      admin$ = this.firestore
        .collection('Members')
        .doc(panel.boardChampion.id)
        .get();
    }

    if (panel.panelCoordinator && panel.panelCoordinator.id) {
      member$ = this.firestore
        .collection('Members')
        .doc(panel.panelCoordinator.id)
        .get();
    }

    if (panel.panelLeader && panel.panelLeader.id) {
      panelLeader$ = this.firestore
        .collection('Members')
        .doc(panel.panelLeader.id)
        .get();
    }
    if (panel.panelMember1 && panel.panelMember1.id) {
      panelMember1$ = this.firestore
        .collection('Members')
        .doc(panel.panelMember1.id)
        .get();
    }
    if (panel.panelMember2 && panel.panelMember2.id) {
      panelMember2$ = this.firestore
        .collection('Members')
        .doc(panel.panelMember2.id)
        .get();
    }
    if (panel.panelMember3 && panel.panelMember3.id) {
      panelMember3$ = this.firestore
        .collection('Members')
        .doc(panel.panelMember3.id)
        .get();
    }
    if (panel.panelMember4 && panel.panelMember4.id) {
      panelMember4$ = this.firestore
        .collection('Members')
        .doc(panel.panelMember4.id)
        .get();
    }
    if (panel.panelMember5 && panel.panelMember5.id) {
      panelMember5$ = this.firestore
        .collection('Members')
        .doc(panel.panelMember5.id)
        .get();
    }



    return combineLatest([
      facility$,
      admin$,
      member$,
      panelLeader$,
      panelMember1$,
      panelMember2$,
      panelMember3$,
      panelMember4$,
      panelMember5$,
    ]).pipe(
      map(
        ([
          facility,
          boardChampion,
          panelCoordinator,
          panelLeader,
          panelMember1,
          panelMember2,
          panelMember3,
          panelMember4,
          panelMember5,
        ]) => {
          if (facility) {
            panel.facility = {
              ...facility.data(),
              id: facility.id,
            };
          }
          if (boardChampion) {
            panel.boardChampion = {
              ...boardChampion.data(),
              id: boardChampion.id,
            };
          }
          if (panelCoordinator) {
            panel.panelCoordinator = {
              ...panelCoordinator.data(),
              id: panelCoordinator.id,
            };
          }
          if (panelLeader) {
            panel.panelLeader = {
              ...panelLeader.data(),
              id: panelLeader.id,
            };
          }
          if (panelMember1) {
            panel.panelMember1 = {
              ...panelMember1.data(),
              id: panelMember1.id,
            };
          }
          if (panelMember2) {
            panel.panelMember2 = {
              ...panelMember2.data(),
              id: panelMember2.id,
            };
          }
          if (panelMember3) {
            panel.panelMember3 = {
              ...panelMember3.data(),
              id: panelMember3.id,
            };
          }
          if (panelMember4) {
            panel.panelMember4 = {
              ...panelMember4.data(),
              id: panelMember4.id,
            };
          }
          if (panelMember5) {
            panel.panelMember5 = {
              ...panelMember5.data(),
              id: panelMember5.id,
            };
          }
          panel.allMembers = []
            if(boardChampion.exists){
              panel.allMembers.push(boardChampion.data().firstName + " " + boardChampion.data().lastName)
            }
            if(panelCoordinator.exists){
              panel.allMembers.push(panelCoordinator.data().firstName + " " + panelCoordinator.data().lastName)
            }
            if(panelLeader.exists){
              panel.allMembers.push(panelLeader.data().firstName + " " + panelLeader.data().lastName)
            }
            if(panelMember1.exists){
              panel.allMembers.push(panelMember1.data().firstName + " " + panelMember1.data().lastName)
            }
            if(panelMember2.exists){
              panel.allMembers.push(panelMember2.data().firstName + " " + panelMember2.data().lastName)
            }
            if(panelMember3.exists){
              panel.allMembers.push(panelMember3.data().firstName + " " + panelMember3.data().lastName)
            }
            if(panelMember4.exists){
              panel.allMembers.push(panelMember4.data().firstName + " " + panelMember4.data().lastName)
            }
            if(panelMember5.exists){
              panel.allMembers.push(panelMember5.data().firstName + " " + panelMember5.data().lastName)
            }

          panel.allMembers = panel.allMembers.map(name => {
            return name.toLowerCase()
          })

          panel.allMembers = panel.allMembers.join(";")

          return panel as Panel;
        }
      )
    );
  }
}
