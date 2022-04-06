import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {Contact} from '../model/Contact';
import {ContactService} from '../contact/contact.service';
import {timer} from 'rxjs';
import {isCombinedNodeFlagSet} from 'tslint';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChildren('text') textBoxes: QueryList<ElementRef>;

  registered = false;
  submitted = false;
  userForm: FormGroup;
  contact: Contact;
  sendDisabled = false;
  contactSubmitted = false;


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
    this.contact = new Contact();
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$')]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.registered = true;
    }
    this.contact.email = this.userForm.controls.email.value;
    this.contact.firstName = this.userForm.controls.first_name.value;
    this.contact.lastName = this.userForm.controls.last_name.value;
    this.contact.phone = this.userForm.controls.phone.value;
    this.contact.message = this.userForm.controls.message.value;

    this.sendDisabled = true;
    this.postContactForm(form.value);
  }

  timerToClear(form: NgForm) {
    const source = timer(1000, 2000);
    const subscribe = source.subscribe(val => {
      console.log(val);
      this.textBoxes.forEach((element) => {
        element.nativeElement.value = '';
      });
      // clears the submit message after 3 seconds
      if (val === 3) {
        this.contactSubmitted = false;
        subscribe.unsubscribe();
      }
    });
  }

  clearForm(form: NgForm) {
    console.log(form.control.value.phone);
  }

  postContactForm(form: NgForm) {
    this.contactService.postContactForm(this.contact)
    this.sendDisabled = false;
    this.contactSubmitted = true;
    console.log('Contact form successfully sent');
    this.timerToClear(form);
  }
}
