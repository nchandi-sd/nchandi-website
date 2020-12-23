import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Contact} from '../model/Contact';
import { Facility } from '../model/Facility';
import { AdminService } from '../admin/admin.service';

/**
 * @title Basic use of the tab group
 */
@Component({
  selector: 'app-admin-component',
  templateUrl: 'admin.component.html',
})
export class AdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}


