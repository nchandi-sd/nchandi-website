import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Facility } from 'src/app/model/Facility';

@Component({
  selector: 'app-facility-input',
  templateUrl: './facility-input.component.html',
  styleUrls: ['./facility-input.component.scss'],
})
export class FacilityInputComponent {
  @Input()
  get facility() {
    return this.userForm.getRawValue();
  }
  set facility(val: Facility) {
    this.userForm.setValue({
      active: val.active,
      facilityName: val.facilityName,
      facilityType: val.facilityType,
      address: val.address,
      city: val.city,
      state: val.state,
      mainContactEmail: val.mainContactEmail,
      mainContactName: val.mainContactName,
      mainContactPhone: val.mainContactPhone,
      alternateContactEmail: val.alternateContactEmail,
      alternateContactName: val.alternateContactName,
      alternateContactPhone: val.alternateContactPhone,
      website: val.website,
    });
  }

  get valid() {
    return this.userForm.valid;
  }

  get value() {
    return this.userForm.getRawValue();
  }

  @Output()
  formSubmit = new EventEmitter<Facility>();

  userForm = new FormGroup({
    active: new FormControl(false, Validators.required),
    facilityName: new FormControl('', Validators.required),
    facilityType: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    mainContactEmail: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    mainContactName: new FormControl('', Validators.required),
    mainContactPhone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$'),
    ]),
    alternateContactEmail: new FormControl('', Validators.email),
    alternateContactName: new FormControl(''),
    alternateContactPhone: new FormControl(
      '',
      Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$')
    ),
    website: new FormControl('', Validators.required),
  });

  onFormSubmit() {
    if (this.userForm.valid) {
      this.formSubmit.emit(this.userForm.getRawValue());
      this.userForm.reset();
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key).setErrors(null);
      });
    }
  }
}
