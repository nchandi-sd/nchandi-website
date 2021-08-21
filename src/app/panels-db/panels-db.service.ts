import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { Panels } from '../model/PanelsDB';
import {AdminService} from '../admin/admin.service';
import {Facility} from '../model/Facility';


@Injectable()
export class PanelsDbService {
  constructor(private firestore: AngularFirestore) {
  }

  getPanels(id: string) {
    return this.firestore.collection('Facilities').doc(id.toString()).collection('Panels').snapshotChanges();
  }

  addPanels(panels: Panels) {
    return this.firestore.collection('Facilities').doc(panels.facility.id.toString()).collection('Panels').add({...panels});
  }

  // updateFacility(facility: Facility){
  //  this.firestore.collection('Facilities').doc(facility.id).update({ ...facility});
  // }
}
