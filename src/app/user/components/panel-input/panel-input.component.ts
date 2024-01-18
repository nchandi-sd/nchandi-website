import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminMember } from 'src/app/model/AdminMember';
import { Facility } from 'src/app/model/Facility';
import { Panel } from 'src/app/model/Panel';
import { FacilitiesService } from 'src/app/shared/services/facilities.service';
import { PanelMemberService } from 'src/app/shared/services/panel-member.service';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

@Component({
  selector: 'app-panel-input',
  templateUrl: './panel-input.component.html',
  styleUrls: ['./panel-input.component.scss'],
})
export class PanelInputComponent implements OnInit {
  @Input()
  get panel() {
    return this.userForm.getRawValue();
  }
  set panel(val: Panel) {
    this.userForm.setValue({
      dayOfWeek: val.dayOfWeek,
      weekOfMonth: val.weekOfMonth,
      eventTime: val.eventTime,
      facility: val.facility.facilityName,
      facilityId: val.facility.id,
      location: val.location,
      gender: val.gender,
      numberNeeded: val.numberNeeded,
      markAsMembersNeeded: val.markAsMembersNeeded,
      boardChampion: val.boardChampion.firstName + " " + val.boardChampion.lastName,
      panelCoordinator: val.panelCoordinator.firstName + " " + val.panelCoordinator.lastName,
      panelLeader: val.panelLeader.firstName + " " + val.panelLeader.lastName,
      panelMember1: val.panelMember1.firstName + " " + val.panelMember1.lastName,
      panelMember2: val.panelMember2.firstName + " " + val.panelMember2.lastName,
      panelMember3: val.panelMember3.firstName + " " + val.panelMember3.lastName,
      panelMember4: val.panelMember4.firstName + " " + val.panelMember4.lastName,
      panelMember5: val.panelMember5.firstName + " " + val.panelMember5.lastName,
      boardChampionId: val.boardChampion.id,
      panelCoordinatorId: val.panelCoordinator.id,
      panelLeaderId: val.panelLeader.id,
      panelMember1Id: val.panelMember1.id,
      panelMember2Id: val.panelMember2.id,
      panelMember3Id: val.panelMember3.id,
      panelMember4Id: val.panelMember4.id,
      panelMember5Id: val.panelMember5.id,
    });

    this.toggleMembersNeeded();
  }

  @Output()
  formSubmit = new EventEmitter<Panel>();

  get valid() {
    return this.userForm.valid;
  }

  get value() {
    const value = this.userForm.getRawValue();
    return value;
  }

  facilities$: Observable<Facility[]>;
  panelMembers$: Observable<AdminMember[]>;
  daysOfWeek = DAYS_OF_WEEK;
  timeOptions = this.getTimeOptions();

  userForm = new FormGroup({
    dayOfWeek: new FormControl('', Validators.required),
    weekOfMonth: new FormControl('', Validators.required),
    eventTime: new FormControl('', Validators.required),
    facility: new FormControl('', Validators.required),
    facilityId: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    gender: new FormControl(''),
    numberNeeded: new FormControl(''),
    markAsMembersNeeded: new FormControl(false),
    boardChampion: new FormControl('Need Person', Validators.required),
    panelCoordinator: new FormControl('Need Person', Validators.required),
    panelLeader: new FormControl('Need Person', Validators.required),
    panelMember1: new FormControl('Need Person', Validators.required),
    panelMember2: new FormControl('Need Person', Validators.required),
    panelMember3: new FormControl('Need Person', Validators.required),
    panelMember4: new FormControl('Need Person', Validators.required),
    panelMember5: new FormControl('Need Person', Validators.required),
    boardChampionId: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
    panelCoordinatorId: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
    panelLeaderId: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
    panelMember1Id: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
    panelMember2Id: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
    panelMember3Id: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
    panelMember4Id: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
    panelMember5Id: new FormControl('oSJUbMSoHBnit4Hko487', Validators.required),
  });

  constructor(
    private members: PanelMemberService,
    private facilities: FacilitiesService
  ) {}

  ngOnInit() {
    this.panelMembers$ = this.members.getPanelMembers();
    this.facilities$ = this.facilities.getFacilities();
    this.toggleMembersNeeded();
  }

  onMarkAsNeededChange(checked: boolean) {
    this.toggleMembersNeeded();
  }

  getId(value, type, list: any[]) {
    if(type === "facility"){
      let selectedDocumentId
      list.map(facility => {
        if(value === facility.facilityName){
          selectedDocumentId = facility.id
        }
      })

      this.userForm.setControl("facilityId", new FormControl(selectedDocumentId))
    }
    if(type === "boardChampion"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("boardChampionId", new FormControl(selectedDocumentId))
    }
    if(type === "panelCoordinator"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("panelCoordinatorId", new FormControl(selectedDocumentId))
    }
    if(type === "panelLeader"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("panelLeaderId", new FormControl(selectedDocumentId))
    }
    if(type === "panelMember1"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("panelMember1Id", new FormControl(selectedDocumentId))
    }
    if(type === "panelMember2"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("panelMember2Id", new FormControl(selectedDocumentId))
    }
    if(type === "panelMember3"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("panelMember3Id", new FormControl(selectedDocumentId))
    }
    if(type === "panelMember4"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("panelMember4Id", new FormControl(selectedDocumentId))
    }
    if(type === "panelMember5"){
      let selectedDocumentId
      list.map(member => {
        var fullName = member.firstName + " " + member.lastName
        if(value === fullName){
          selectedDocumentId = member.id
        }
      })

      this.userForm.setControl("panelMember5Id", new FormControl(selectedDocumentId))
    }

    console.log("userForm", this.userForm)
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

  private toggleMembersNeeded() {
    const neededCtrl = this.userForm.get('markAsMembersNeeded');
    const neededCountCtrl = this.userForm.get('numberNeeded');
    const markedAsNeeded = neededCtrl.value;
    if (markedAsNeeded) {
      neededCountCtrl.enable();
    } else {
      neededCountCtrl.disable();
      neededCountCtrl.reset();
    }
  }

  private getTimeOptions() {
    let timeOptions = [];

    timeOptions = timeOptions.concat(this.getNoonOrMidnight('AM'));
    timeOptions = timeOptions.concat(this.getTimeOption('AM'));
    timeOptions = timeOptions.concat(this.getNoonOrMidnight('PM'));
    timeOptions = timeOptions.concat(this.getTimeOption('PM'));

    return timeOptions;
  }

  private getTimeOption(clarifier: string) {
    const timeOptions = [];

    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 60; j += 15) {
        const time = `${i}:${j.toString().padStart(2, '0')} ${clarifier}`;
        timeOptions.push(time);
      }
    }

    return timeOptions;
  }

  private getNoonOrMidnight(clarifier: string) {
    const timeOptions = [];

    const i = 12;
    for (let j = 0; j < 60; j += 15) {
      const time = `${i}:${j.toString().padStart(2, '0')} ${clarifier}`;
      timeOptions.push(time);
    }

    return timeOptions;
  }
}