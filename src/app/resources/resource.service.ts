import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { PanelMaterials } from '../model/Panel-Materials';
import { MonthlyReport } from '../model/MonthlyReport';
import { Announcement } from '../model/Announcement';
import { AdminMember } from '../model/AdminMember';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResourceService {
  constructor(
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  /**
   * Panel Materials
   */

  getPanelMaterials() {
    return this.firestore
      .collection('Panel Materials')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return this.getMappedData(data) as PanelMaterials[];
        })
      );
  }

  createPanelMaterial(resource: PanelMaterials) {
    return this.firestore.collection('Panel Materials').add({ ...resource });
  }

  /**
   * General Resources
   */

  getGeneralResources() {
    return this.firestore
      .collection('General Resources')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return this.getMappedData(data) as PanelMaterials[];
        })
      );
  }

  createGeneralResource(resource: PanelMaterials) {
    return this.firestore.collection('General Resources').add({ ...resource });
  }

  /**
   * Monthly Reports
   */

  getMonthlyReports() {
    return this.firestore
      .collection('Monthly Reports')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return this.getMappedData(data) as MonthlyReport[];
        })
      );
  }

  createMonthlyReport(report: MonthlyReport) {
    return this.firestore.collection('Monthly Reports').add({ ...report });
  }

  /**
   * Announcements
   */

  getAnnouncements() {
    return this.firestore
      .collection('Announcements')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return this.getMappedData(data) as Announcement[];
        })
      );
  }

  createAnnouncement(announcement: Announcement) {
    return this.firestore.collection('Announcements').add({ ...announcement });
  }

  /**
   * Archived Reports
   */

  getArchivedReports() {
    return this.firestore
      .collection('Archived Reports')
      .snapshotChanges()
      .pipe(
        map((data) => {
          return this.getMappedData(data) as any[];
        })
      );
  }

  createArchiveReport(resource: PanelMaterials) {
    return this.firestore.collection('Archived Reports').add({ ...resource });
  }

  /**
   * List Methods
   */

  deleteItem(reportType: string, reportId: string) {
    this.firestore
      .collection(reportType)
      .doc(reportId)
      .get()
      .subscribe((resp) => {
        if (resp.exists) {
          console.log();
          const name = resp.data().title;
          this.afStorage
            .ref('/' + reportType + '/' + name)
            .delete()
            .subscribe((_) => {
              this.firestore.collection(reportType).doc(reportId).delete();
            });
        }
      });
  }

  deleteDatabaseItem(reportType: string, reportId: string) {
    this.firestore.collection(reportType).doc(reportId).delete();
  }

  updatePanelMaterialsList(materials: PanelMaterials[]) {
    const pmDictionary = {};
    const resp = this.getPanelMaterials().subscribe((data) => {
      data.map((e) => {
        const newPM = {
          // @ts-ignore
          id: e.payload.doc.id,
          // @ts-ignore
          ...e.payload.doc.data(),
        } as PanelMaterials;
          // @ts-ignore
        pmDictionary[e.payload.doc.id] = newPM;
      });

      materials.forEach((material) => {
        if (
          pmDictionary[material.id] &&
          (pmDictionary[material.id] as PanelMaterials) != null &&
          pmDictionary[material.id].order !== material.order
        ) {
          this.firestore.collection('Panel Materials').doc(material.id).update({
            order: material.order,
          });
        }
      });

      resp.unsubscribe();
    });
  }

  updateGeneralResourceList(materials: PanelMaterials[]) {
    const resourceDictionary = {};

    const resp = this.getGeneralResources().subscribe((data) => {
      data.map((e) => {
        const newPM = {
          // @ts-ignore
          id: e.payload.doc.id,
          // @ts-ignore
          ...e.payload.doc.data(),
        } as PanelMaterials;
        // @ts-ignore
        resourceDictionary[e.payload.doc.id] = newPM;
      });

      materials.forEach((material) => {
        if (
          resourceDictionary[material.id] &&
          (resourceDictionary[material.id] as PanelMaterials) != null &&
          resourceDictionary[material.id].order !== material.order
        ) {
          this.firestore
            .collection('General Resources')
            .doc(material.id)
            .update({
              order: material.order,
            });
        }
      });

      resp.unsubscribe();
    });
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
