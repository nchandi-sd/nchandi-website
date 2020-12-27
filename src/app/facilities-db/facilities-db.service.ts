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

  // queryFacility(facility: Facility) {
  //   this.firestore.collection('Facilities').where('facilityName', '==', facility.facilityName)
  //     .get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, ' => ', doc.data());
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log('Error getting documents: ', error);
  //     });
  // }

  // updateFacility(facility: Facility){
  //  this.firestore.collection('Facilities').doc(facility.id).update({ ...facility});
  // }
}

