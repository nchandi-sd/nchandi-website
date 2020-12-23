import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MemberDB } from '../model/MemberDB';


@Injectable()
export class MembersDbService {
  constructor(private firestore: AngularFirestore) { }

  getMembersDB() {
    return this.firestore.collection('Members').snapshotChanges();
  }
  addMembersDB(member: MemberDB) {
    return this.firestore.collection('Members').add({ ...MemberDB });
  }

  // updateFacility(member: MembersDB){
  //  this.firestore.collection('members').doc(facility.id).update({ ...facility});
  // }
}
