import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable()
export class AdminService {
  constructor(private firestore: AngularFirestore) {
  }

  deleteDatabaseItem(collectionType: string, id: string) {
    this.firestore.collection(collectionType).doc(id).delete();
  }

}

