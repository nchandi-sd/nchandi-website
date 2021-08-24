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
      facility: val.facility.id,
      location: val.location,
      gender: val.gender,
      numberNeeded: val.numberNeeded,
      markAsMembersNeeded: val.markAsMembersNeeded,
      boardChampion: val.boardChampion.id,
      panelCoordinator: val.panelCoordinator.id,
      panelLeader: val.panelLeader.id,
      panelMember1: val.panelMember1.id,
      panelMember2: val.panelMember2.id,
      panelMember3: val.panelMember3.id,
      panelMember4: val.panelMember4.id,
      panelMember5: val.panelMember5.id,
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
    value.facilityId = value.facility;
    value.boardChampionId = value.boardChampion;
    value.panelCoordinatorId = value.panelCoordinator;
    value.panelLeaderId = value.panelLeader;
    value.panelMember1Id = value.panelMember1;
    value.panelMember2Id = value.panelMember2;
    value.panelMember3Id = value.panelMember3;
    value.panelMember4Id = value.panelMember4;
    value.panelMember5Id = value.panelMember5;
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
    location: new FormControl('', Validators.required),
    gender: new FormControl(''),
    numberNeeded: new FormControl(''),
    markAsMembersNeeded: new FormControl(false),
    boardChampion: new FormControl('', Validators.required),
    panelCoordinator: new FormControl('', Validators.required),
    panelLeader: new FormControl(''),
    panelMember1: new FormControl(''),
    panelMember2: new FormControl(''),
    panelMember3: new FormControl(''),
    panelMember4: new FormControl(''),
    panelMember5: new FormControl(''),
    panelMembers: new FormControl([]),
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

  onFormSubmit() {
    if (this.valid) {
      this.formSubmit.emit(this.value);
      this.userForm.reset();
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
