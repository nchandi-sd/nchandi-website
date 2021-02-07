import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { MemberDB } from '../model/MemberDB';
import { MembersDbService } from './members-db.service';
import {AdminService} from '../admin/admin.service';

@Component({
  selector: 'app-members-DB',
  templateUrl: 'members-db.component.html',
  styleUrls: ['members-db.component.scss']
})
export class MembersDBComponent implements OnInit {
  userForm: FormGroup;
  member: MemberDB;
  savedMembers: MemberDB[];

  constructor(private formBuilder: FormBuilder, private memberService: MembersDbService, private adminService: AdminService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      sobrietyDate: ['', Validators.required],
      joinedDate: ['', Validators.required],
      lastLogin: ['', Validators.required],
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
    this.member.firstName = this.userForm.controls.firstName.value;
    this.member.lastName = this.userForm.controls.lastName.value;
    this.member.phone = this.userForm.controls.phone.value;
    this.member.email = this.userForm.controls.email.value;
    this.member.sobrietyDate = this.userForm.controls.sobrietyDate.value;
    this.member.joinedDate = this.userForm.controls.joinedDate.value;
    this.member.lastLogin = this.userForm.controls.lastLogin.value;

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

  deleteMember(event: any) {
    const memberID = event.target.getAttribute('id');
    this.adminService.deleteDatabaseItem ('MemberDB', memberID);
  }
}


