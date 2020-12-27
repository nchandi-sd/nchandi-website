import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { PanelsDB } from '../Model/PanelsDB';
import {AdminService} from '../admin/admin.service';


@Injectable()
export class PanelsDbService {
  constructor(private firestore: AngularFirestore) {
  }

  getPanels() {
    return this.firestore.collection('Panels').snapshotChanges();
  }

  addPanels(panels: PanelsDB) {
    return this.firestore.collection('Panels').add({...panels});
  }

  deleteDatabaseItem(collectionType: string, id: string) {
    this.firestore.collection(collectionType).doc(id).delete();
  }

  // updateFacility(facility: Facility){
  //  this.firestore.collection('Facilities').doc(facility.id).update({ ...facility});
  // }
}
