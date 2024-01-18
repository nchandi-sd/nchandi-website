import { HttpClient } from '@angular/common/http';
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
    private panelMemberService: PanelMemberService,
    private https: HttpClient,
  ) { }

  addVolunteer(volunteer) {
    let postRef
    return this.panelMemberService.getPanelMembers().subscribe(members => {
      var equivilentMemberArray: any[] = members.filter(member => member.phone === volunteer.phone)
      this.getVolunteers().subscribe(volunteers => {
        equivilentMemberArray = equivilentMemberArray.concat(volunteers.filter((vol: any) => vol.phone === volunteer.phone))
        equivilentMemberArray.length > 0 ? "Sorry but this member already exists" : (
          console.log("volunteer", volunteer),
          this.https.post(/* "https://nchandi-email.herokuapp.com/pending" */ "https://nchandi-serverless-functions.vercel.app/api/pending", volunteer).subscribe(res => console.log("res", res), err => {
            if(err.status === 200) {
              alert("you have successfully signed up to volunteer. An admin will soon look over your info for approval")
            } else {
              alert("there was an error")
            }
          })
        )
      })
    }
    )
  }

  approveVolunteer(volunteer: any) {
    return this.https.post("https://nchandi-serverless-functions.vercel.app/api/approve", volunteer).subscribe(res => console.log("res", res))
    /* return this.https.post("https://nchandi-email.herokuapp.com/approve", volunteer).subscribe(res => console.log("res", res)) */
  }

  deleteVolunteer(id){
    console.log("id", id)
    return this.https.delete("https://nchandi-serverless-functions.vercel.app/api/reject?id=" + id).subscribe(res => console.log("res", res))
/*     return this.https.delete("https://nchandi-email.herokuapp.com/reject/" + id).subscribe(res => console.log("res", res)) */
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