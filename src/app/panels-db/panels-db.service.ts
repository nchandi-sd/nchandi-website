import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Panels } from '../model/PanelsDB';
import {AdminService} from '../admin/admin.service';
import {Facility} from '../model/Facility';


@Injectable()
export class PanelsDbService {
  constructor(private firestore: AngularFirestore) {
  }

  getPanels() {
    return this.firestore.collection('Panels').snapshotChanges();
  }

  addPanels(panels: Panels) {
    return this.firestore.collection('Facilities').add({...panels});
  }

  // updateFacility(facility: Facility){
  //  this.firestore.collection('Facilities').doc(facility.id).update({ ...facility});
  // }
}
