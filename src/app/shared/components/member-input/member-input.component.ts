import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminMember } from 'src/app/model/AdminMember';

@Component({
  selector: 'app-member-input',
  templateUrl: './member-input.component.html',
  styleUrls: ['./member-input.component.scss'],
})
export class MemberInputComponent implements OnInit {
  @Input()
  hasCommitment = true;

  @Output()
  formSubmit = new EventEmitter<AdminMember>();

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$'),
    ]),
    commitment: new FormControl('', Validators.required),
  });

  private submitted = false;

  constructor() {}

  ngOnInit() {
    if (!this.hasCommitment) {
      this.userForm.get('commitment').setValue(-1);
    }
  }

  hasInvalidFirstName() {
    return this.submitted && this.userForm.controls.firstName.errors != null;
  }

  hasInvalidLastName() {
    return this.submitted && this.userForm.controls.lastName.errors != null;
  }

  hasInvalidEmail() {
    return this.submitted && this.userForm.controls.email.errors != null;
  }

  hasInvalidPhone() {
    return this.submitted && this.userForm.controls.phone.errors != null;
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      this.submitted = true;
      this.formSubmit.emit(this.userForm.getRawValue());
    }
  }
}
