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
  get member() {
    return this.userForm.getRawValue();
  }
  set member(val: AdminMember) {
    this.userForm.setValue({
      firstName: val.firstName,
      lastName: val.lastName,
      email: val.email,
      phone: val.phone,
      commitment: val.commitment ? val.commitment : '',
      preferredContactMethod: val.preferredContactMethod ? val.preferredContactMethod : 'text',
    });
  }

  @Input()
  hasCommitment = true;

  @Output()
  formSubmit = new EventEmitter<AdminMember>();

  get valid() {
    return this.userForm.valid;
  }

  get value() {
    return this.userForm.getRawValue();
  }

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$'),
    ]),
    commitment: new FormControl('', Validators.required),
    preferredContactMethod: new FormControl('text'),
  });

  constructor() {}

  ngOnInit() {
    if (!this.hasCommitment) {
      this.userForm.get('commitment').setValue(-1);
    }
  }

  onFormSubmit() {
    if (this.valid) {
      this.formSubmit.emit(this.value);
      this.userForm.reset();
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key).setErrors(null);
      });
    }
  }
}
