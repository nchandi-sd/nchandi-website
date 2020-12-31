import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable()
export class AdminService {
  constructor(private firestore: AngularFirestore) {
  }

  deleteDatabaseItem(collectionType: string, id: string) {
    this.firestore.collection(collectionType).doc(id).delete();
  }

  deleteSubCollectionDatabaseItem(collectionType: string, subCollection: string, id: string, subId: string) {
    this.firestore.collection(collectionType).doc(id).collection(subCollection).doc(subId).delete();
  }

}

