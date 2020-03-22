import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { PanelMaterials } from '../model/Panel-Materials';
import { MonthlyReport } from '../model/MonthlyReport';
import { Announcement } from '../model/Announcement';
import { AdminMember } from '../model/AdminMember';
import { Resource } from '../model/Resource';

@Injectable()
export class ResourceService {
  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage, ) { }

  getAdminList() {
    return this.firestore.collection('Admin').snapshotChanges();
  }

  getPanelMaterials() {
    return this.firestore.collection('Panel Materials').snapshotChanges();
  }

  getGeneralResources() {
    return this.firestore.collection('General Resources').snapshotChanges();
  }

  getMonthlyReports() {
    return this.firestore.collection('Monthly Reports').snapshotChanges();
  }

  getAnnouncements() {
    return this.firestore.collection('Announcements').snapshotChanges();
  }

  getArchivedReports() {
    return this.firestore.collection('Archived Reports').snapshotChanges();
  }

  addAdminMember(admin: AdminMember) {
    return this.firestore.collection('Admin').add({ ...admin });
  }

  createAnnouncement(announcement: Announcement) {
    return this.firestore.collection('Announcements').add({ ...announcement });
  }

  createPanelMaterial(resource: PanelMaterials) {
    return this.firestore.collection('Panel Materials').add({ ...resource });
  }

  // using panel material as general resource because I'm lazy, and they're the same thing essentially
  createGeneralResource(resource: PanelMaterials) {
    return this.firestore.collection('General Resources').add({ ...resource });
  }

  createMonthlyReport(report: MonthlyReport) {
    return this.firestore.collection('Monthly Reports').add({ ...report });
  }

  createArchiveReport(resource: PanelMaterials) {
    return this.firestore.collection('Archived Reports').add({ ...resource });
  }

  deleteItem(reportType: string, reportId: string) {

    this.firestore.collection(reportType).doc(reportId).get().subscribe(resp => {
      if (resp.exists) {
        console.log()
        let name = resp.data().title
        this.afStorage.ref('/' + reportType + '/' + name).delete().subscribe(_ => {
          this.firestore.collection(reportType).doc(reportId).delete()
        })

      }

    })
  }

  deleteDatabaseItem(reportType: string, reportId: string) {
    this.firestore.collection(reportType).doc(reportId).delete();
  }
  //
  // deletePolicy(policyId: string){
  //   this.firestore.doc('policies/' + policyId).delete();
  // }

  updatePanelMaterialsList(materials: PanelMaterials[]) {

    let pmDictionary = {};

    let resp = this.getPanelMaterials().subscribe(data => {
      data.map(e => {
        let newPM = {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PanelMaterials;
        pmDictionary[e.payload.doc.id] = newPM;
      });


      materials.forEach(material => {


        if (pmDictionary[material.id] && (pmDictionary[material.id] as PanelMaterials != null) && pmDictionary[material.id].order != material.order) {
          console.log("should change")
          this.firestore.collection("Panel Materials").doc(material.id).update({
            "order": material.order
          });
        }
      })

      resp.unsubscribe()
    });

  }

  updateGeneralResourceList(materials: PanelMaterials[]) {

    let resourceDictionary = {};

    let resp = this.getGeneralResources().subscribe(data => {
      data.map(e => {
        let newPM = {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PanelMaterials;
        resourceDictionary[e.payload.doc.id] = newPM;
      });


      materials.forEach(material => {


        if (resourceDictionary[material.id] && (resourceDictionary[material.id] as PanelMaterials != null) && resourceDictionary[material.id].order != material.order) {
          console.log("should change")
          this.firestore.collection("General Resources").doc(material.id).update({
            "order": material.order
          });
        }
      })

      resp.unsubscribe()
    });

  }

}
