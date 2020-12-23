import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Facility} from '../model/Facility';


@Injectable()
export class FacilitiesService {
  constructor(private firestore: AngularFirestore) {
  }

  getFacilities() {
    return this.firestore.collection('Facilities').snapshotChanges();
  }

  addFacility(facility: Facility) {
    return this.firestore.collection('Facilities').add({...facility});
  }

  // updateFacility(facility: Facility){
  //  this.firestore.collection('Facilities').doc(facility.id).update({ ...facility});
  // }
}

