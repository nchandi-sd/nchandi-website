import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Panel } from 'src/app/model/Panel';

@Component({
  selector: 'app-panel-input',
  templateUrl: './panel-input.component.html',
  styleUrls: ['./panel-input.component.scss']
})
export class PanelInputComponent implements OnInit {
  @Output()
  formSubmit = new EventEmitter<Panel>();

  userForm = new FormGroup({
    eventTime: new FormControl('', Validators.required),
    facility: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    numberNeeded: new FormControl('', Validators.required),
    panelMemberCount: new FormControl(0, Validators.required),
    boardChampion: new FormControl('', Validators.required),
    panelCoordinator: new FormControl('', Validators.required),
    panelMembers: new FormControl([]),
  });

  private submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      this.submitted = true;
      this.formSubmit.emit(this.userForm.getRawValue());
    }
  }
}
