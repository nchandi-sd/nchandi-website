import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { MemberDB } from '../model/MemberDB';
import { MembersDbService } from './members-db.service';
import {AdminService} from '../admin/admin.service';

@Component({
  selector: 'app-members-DB',
  templateUrl: 'members-db.component.html',
})
export class MembersDBComponent implements OnInit {
  userForm: FormGroup;
  member: MemberDB;
  savedMembers: MemberDB[];

  constructor(private formBuilder: FormBuilder, private memberService: MembersDbService, private adminService: AdminService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      facility_name: ['', Validators.required],
      facility_type: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      website: ['', Validators.required],
      mainContactName: ['', Validators.required],
      mainContactEmail: ['', Validators.required],
      mainContactPhone: ['', Validators.required],
      alternateContactName: ['', Validators.required],
      alternateContactEmail: ['', Validators.required],
      alternateContactPhone: ['', Validators.required],
      active: [true, Validators.required],
    });
    this.member = new MemberDB();
    this.memberService.getMembersDB().subscribe(data => {
      this.savedMembers = data.map(e => {
        console.log('retrieved admins from firestore');
        // @ts-ignore
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as MemberDB;
      });
    });
  }

  onSubmit(form: NgForm) {
    if (this.userForm.invalid === true) {
      return;
    }
    // this.facility.facilityName = this.userForm.controls.facility_name.value;
    // this.facility.facilityType = this.userForm.controls.facility_type.value;
    // this.facility.address = this.userForm.controls.address.value;
    // this.facility.city = this.userForm.controls.city.value;
    // this.facility.state = this.userForm.controls.state.value;
    // this.facility.zip = this.userForm.controls.state.value;
    // this.facility.website = this.userForm.controls.website.value;
    // this.facility.mainContactName = this.userForm.controls.mainContactName.value;
    // this.facility.mainContactEmail = this.userForm.controls.mainContactEmail.value;
    // this.facility.mainContactPhone = this.userForm.controls.mainContactPhone.value;
    // this.facility.alternateContactName = this.userForm.controls.alternateContactName.value;
    // this.facility.alternateContactEmail = this.userForm.controls.alternateContactEmail.value;
    // this.facility.alternateContactPhone = this.userForm.controls.alternateContactPhone.value;
    // this.facility.active = this.userForm.controls.active.value;


    this.postMembersDBForm(this.member);
    this.resetUserForm(form.value);
  }

  postMembersDBForm(member: MemberDB) {
    this.memberService.addMembersDB (member)
      .then(res => {
        // update UI
      });
  }

  resetUserForm(form: NgForm) {
  }

  deleteFacility(event: any) {
    const memberID = event.target.getAttribute('id');
    this.adminService.deleteDatabaseItem ('Members', memberID);
  }
}


