import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminMember } from 'src/app/model/AdminMember';
import { Facility } from 'src/app/model/Facility';
import { Panel } from 'src/app/model/Panel';
import { AdminService } from 'src/app/shared/services/admin.service';
import { FacilitiesService } from 'src/app/shared/services/facilities.service';
import { PanelMemberService } from 'src/app/shared/services/panel-member.service';

@Component({
  selector: 'app-panel-input',
  templateUrl: './panel-input.component.html',
  styleUrls: ['./panel-input.component.scss'],
})
export class PanelInputComponent implements OnInit {
  // TODO: Add members
  @Input()
  get panel() {
    return this.userForm.getRawValue();
  }
  set panel(val: Panel) {
    this.userForm.setValue({
      eventDate: val.eventDate.toLocaleDateString('en-US'),
      eventTime: val.eventDate.toLocaleTimeString('en-US'),
      facility: val.facility.id,
      location: val.location,
      gender: val.gender,
      numberNeeded: val.numberNeeded,
      panelMemberCount: val.panelMemberCount,
      boardChampion: val.boardChampion.id,
      panelCoordinator: val.panelCoordinator.id,
      panelMembers: val.panelMembers,
    });
  }

  @Output()
  formSubmit = new EventEmitter<Panel>();

  get valid() {
    return this.userForm.valid;
  }

  get value() {
    const value = this.userForm.getRawValue();
    const eventDate = this.getDateFromString(value.eventDate, value.eventTime);
    delete value.eventTime;
    value.eventDate = eventDate;
    value.panelMemberCount = value.panelMembers.length;
    value.facilityId = value.facility;
    value.boardChampionId = value.boardChampion;
    value.panelCoordinatorId = value.panelCoordinator;
    return value;
  }

  get eventDateError() {
    const ctrl = this.userForm.get('eventDate');
    if (!ctrl.pristine && ctrl.errors !== null) {
      return 'Date must be in DD/MM/YYYY Format.';
    }
    return '';
  }

  facilities$: Observable<Facility[]>;
  panelMembers$: Observable<AdminMember[]>;
  boardMembers$: Observable<AdminMember[]>;
  timeOptions = this.getTimeOptions();

  userForm = new FormGroup({
    // tslint:disable-next-line: max-line-length
    eventDate: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/
      ),
    ]),
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

  constructor(
    private members: PanelMemberService,
    private admins: AdminService,
    private facilities: FacilitiesService
  ) {}

  ngOnInit() {
    this.panelMembers$ = this.members.getPanelMembers();
    this.boardMembers$ = this.admins.getAdminList();
    this.facilities$ = this.facilities.getFacilities();
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      this.formSubmit.emit(this.value);
    }
  }

  private getDateFromString(dateStr: string, timeStr: string) {
    const parts = timeStr.match(/(\d+)\:(\d+) (\w+)/);
    const hours = /am/i.test(parts[3])
      ? parseInt(parts[1], 10)
      : parseInt(parts[1], 10) + 12;
    const minutes = parseInt(parts[2], 10);

    const date = new Date(dateStr);
    date.setHours(hours);
    date.setMinutes(minutes);

    return date;
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
