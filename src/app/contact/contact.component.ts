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

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {}

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
    this.contact = new Contact()
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$')]],
      message: ['',[Validators.required]]
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.registered = true;
    }
    this.contact.email = this.userForm.controls.email.value
    this.contact.firstName = this.userForm.controls.first_name.value
    this.contact.lastName = this.userForm.controls.last_name.value
    this.contact.phone = this.userForm.controls.phone.value
    this.contact.message = this.userForm.controls.message.value

    this.postContactForm(form.value)
  }

  postContactForm(form: NgForm) {
    console.log("contact: "+ this.contact)

    // let contactUrl = 'https://script.google.com/macros/s/AKfycbzezNitOBOTReBZ7kvtV8fzTEiW-bA8mGOnJDQl7orAr65gvRd8/exec';
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', contactUrl);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onload = function() {

    //   console.log("yay subscribe called")
    //     if (xhr.status === 200) {
    //       console.log("got 200");
    //         //var userInfo = JSON.parse(xhr.responseText);
    //     }
    // };
    // xhr.send(JSON.stringify(form));

     this.contactService.postContactForm(this.contact)
       .subscribe(() => console.log("yay subscribe called"))
  }
}
