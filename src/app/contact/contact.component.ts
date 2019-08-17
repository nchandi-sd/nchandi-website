import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Contact } from '../model/Contact';
import {ContactService} from '../contact/contact.service'


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;
  contact: Contact;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {

  }

  invalidFirstName() {
    return (this.submitted && this.userForm.controls.first_name.errors != null);
  }

  invalidLastName() {
    return (this.submitted && this.userForm.controls.last_name.errors != null);
  }

  invalidEmail() {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }

  invalidPhone() {
    return (this.submitted && this.userForm.controls.phone.errors != null);
  }

  invalidMessage() {
    return (this.submitted && this.userForm.controls.message.errors != null);
  }

 

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$')]],
      message: ['', Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.registered = true;
    }
    this.postContactForm(form.value);
  }

  postContactForm(form: NgForm) {
    console.log(form);
    // this.contactService.postContactForm(this.contact)
    //   .subscribe(() => console.log("yay done"))
  }
}
