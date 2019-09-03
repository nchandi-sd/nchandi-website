import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {PanelMaterials} from '../model/Panel-Materials';
import {MonthlyReport} from '../model/MonthlyReport';

@Injectable()
export class ResourceService {
  constructor(private firestore: AngularFirestore) {}

  getPanelMaterials() {
    return this.firestore.collection('Panel Materials').snapshotChanges();
  }

  getGeneralResources() {
    return this.firestore.collection('General Resources').snapshotChanges();
  }

  getMonthlyReports() {
    return this.firestore.collection('Monthly Reports').snapshotChanges();
  }

  createPanelMaterial(resource: PanelMaterials) {
    return this.firestore.collection('Panel Materials').add({...resource});
  }

  // using panel material as general resource because I'm lazy, and they're the same thing essentially
  createGeneralResource(resource: PanelMaterials) {
    return this.firestore.collection('General Resources').add({...resource});
  }

  createMonthlyReport(report: MonthlyReport) {
    return this.firestore.collection('Monthly Reports').add({...report});
  }
  //
  // deletePolicy(policyId: string){
  //   this.firestore.doc('policies/' + policyId).delete();
  // }
}
