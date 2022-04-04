import { Component, Input, OnInit, Output, EventEmitter,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Panel } from 'src/app/model/Panel';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.scss']
})
export class VolunteerComponent implements OnInit {

  @Input()
  panel

  @Output()
  close = new EventEmitter<boolean>()


  @Output()
  formSubmit = new EventEmitter();



  constructor() {}

  ngOnInit() {
    this.userForm.addControl("panelId", new FormControl(this.panel.id))
    this.userForm.addControl("facilityName", new FormControl(this.panel.facility.facilityName))
    this.userForm.addControl("dayOfWeek", new FormControl(this.panel.dayOfWeek))
    this.userForm.addControl("weekOfMonth", new FormControl(this.panel.weekOfMonth))
    this.userForm.addControl("eventTime", new FormControl(this.panel.eventTime))
  }

  get valid() {
    return this.userForm.valid;
  }

  get value() {
    return this.userForm.getRawValue();
  }

  ngOnChanges(){
    this.panel = this.panel
  }

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$'),
    ]),
    preferredContactMethod: new FormControl('text'),
  });

  onFormSubmit() {
    if (this.valid) {
      this.formSubmit.emit(this.value);
      this.value.facility = this.panel.facility.facilityName
      console.log("this.value", this.value)
      this.userForm.reset();
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key).setErrors(null);
      });
    }
  }

  onClose(value){
    console.log("that panel be like", this.panel)
    this.close.emit(value)
  }

}
