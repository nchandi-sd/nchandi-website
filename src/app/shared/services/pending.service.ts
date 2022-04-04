import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PanelMemberService } from './panel-member.service';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(
    private firestore: AngularFirestore,
    private panelMemberService: PanelMemberService
  ) { }

  addVolunteer(volunteer) {
    return this.panelMemberService.getPanelMembers().subscribe(members => {
      var equivilentMemberArray: any[] = members.filter(member => member.phone === volunteer.phone)
      this.getVolunteers().subscribe(volunteers => {
        equivilentMemberArray = equivilentMemberArray.concat(volunteers.filter((vol: any) => vol.phone === volunteer.phone))
        equivilentMemberArray.length > 0 ? "Sorry but this member already exists" : this.firestore.collection("Pending").add(volunteer)
      })
    }
    )
  }

  approveVolunteer(volunteer: any) {
    return this.firestore.collection("Panels").doc(volunteer.panelId).get().subscribe(panel => {
      this.firestore.collection("Members").add({
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        email: volunteer.email,
        phone: volunteer.phone,
        commitment: -1
      }).then(newMember => {
        newMember.get().then(member => {
          let numberNeeded = panel.data().numberNeeded
          let soonToBeFilledSlot = `panelMember${6 - numberNeeded}`

          if(numberNeeded !== 0){
            panel.ref.update({
              numberNeeded: numberNeeded - 1,
              [soonToBeFilledSlot]: member.ref
            })
            this.deleteVolunteer(volunteer.id)
          }
        })
      })

    })
  }

  deleteVolunteer(id){
    return this.firestore.collection("Pending").doc(id).delete()
  }

  getVolunteer(id){
    return this.firestore.collection("Pending").doc(id).get()
  }

  getVolunteers(){
    return this.firestore.collection("Pending").snapshotChanges().pipe(
        map((data) => {
          return data.map((e) => {
            return {
              id: e.payload.doc.id,
              // @ts-ignore
              ...e.payload.doc.data(),
            };
          });
        })
      );
  }
}
