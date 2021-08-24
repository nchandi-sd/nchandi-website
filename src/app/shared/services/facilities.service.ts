import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Facility } from 'src/app/model/Facility';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  private get isAdmin() {
    return this.adminService.isAdmin;
  }

  constructor(
    private adminService: AdminService,
    private firestore: AngularFirestore
  ) {}

  getFacilities() {
    return this.getFacilitiesFromStore('Facilities').pipe(
      map(facilities => {
        return facilities.filter(f => f.facilityType === 'Treatment');
      })
    );
  }

  getCorrectionalFacilities() {
    return this.getFacilitiesFromStore('Facilities').pipe(
      map(facilities => {
        return facilities.filter(f => f.facilityType === 'Correctional');
      })
    );
  }

  addFacility(admin: Facility) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Facilities').add({ ...admin }));
        }
        return of(undefined);
      })
    );
  }

  updateFacility(id: string, member: Facility) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Facilities').doc(id).update(member));
        }
        return of(undefined);
      })
    );
  }

  deleteFacility(id: string) {
    return this.isAdmin.pipe(
      switchMap((isAdmin) => {
        if (isAdmin) {
          return from(this.firestore.collection('Facilities').doc(id).delete());
        }
        return of(undefined);
      })
    );
  }

  private getFacilitiesFromStore(resourceType: string) {
    return this.firestore
      .collection(resourceType)
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((e) => {
            return {
              id: e.payload.doc.id,
              // @ts-ignore
              ...e.payload.doc.data(),
            } as Facility;
          });
        })
      );
  }
}
