import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MembersDB } from '../Model/MembersDB';


@Injectable()
export class MembersDBService {
  constructor(private firestore: AngularFirestore) { }

  getMembersDB() {
    return this.firestore.collection('Members').snapshotChanges();
  }
  addMembersDB(member: MembersDB) {
    return this.firestore.collection('Members').add({ ...MembersDB });
  }
  deleteDatabaseItem(collectionType: string, id: string) {
    this.firestore.collection(collectionType).doc(id).delete();
  }
  // updateFacility(member: MembersDB){
  //  this.firestore.collection('members').doc(facility.id).update({ ...facility});
  // }
}
