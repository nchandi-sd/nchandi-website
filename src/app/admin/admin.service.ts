import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Facility } from '../Model/Facility';


@Injectable()
export class AdminService {
  constructor(private firestore: AngularFirestore) { }

  getFacilities() {
    return this.firestore.collection('Facilities').snapshotChanges();
  }
  addFacility(facility: Facility) {
    return this.firestore.collection('Facilities').add({ ...facility });
  }
  deleteDatabaseItem(collectionType: string, id: string) {
    this.firestore.collection(collectionType).doc(id).delete();
  }
  // updateFacility(facility: Facility){
  //  this.firestore.collection('Facilities').doc(facility.id).update({ ...facility});
  // }
}

