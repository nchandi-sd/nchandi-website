import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Panels} from '../model/PanelsDB';
import {AdminService} from '../admin/admin.service';
import {PanelsDbService} from '../panels-db/panels-db.service';
import {FacilitiesService} from '../facilities-db/facilities-db.service';
import {Facility} from '../model/Facility';

@Component({
  selector: 'app-panels-db',
  templateUrl: './panels-db.component.html',
  styleUrls: ['./panels-db.component.scss']
})
export class PanelsDBComponent implements OnInit {
  userForm: FormGroup;
  panel: Panels;
  panels: Panels[];
  facilities: Facility[];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private panelsService: PanelsDbService,
    private facilityService: FacilitiesService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      dayOfWeek: ['', Validators.required],
      time: ['', Validators.required],
      coordinator: ['', Validators.required],
      leader: ['', Validators.required],
      member1: ['', Validators.required],
      member2: ['', Validators.required],
      member3: ['', Validators.required],
      member4: ['', Validators.required],
      member5: ['', Validators.required],
      active: [true, Validators.required],
    });
    this.panel = new Panels();
    this.panelsService.getPanels().subscribe(data => {
      this.panels = data.map(e => {
        console.log('retrieved admins from firestore');
        // @ts-ignore
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Panels;
      });
    });
    this.facilityService.getFacilities().subscribe(data => {
      this.facilities = data.map(e => {
        console.log('retrieved facilities from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Facility;
      });
      this.facilities.forEach(function (value) {
        console.log(value);
      });
    });

  }

  onSubmit(form: NgForm) {
    if (this.userForm.invalid === true) {
      return;
    }
    this.panel.dayOfWeek = this.userForm.controls.dayOfWeek.value;
    this.panel.time = this.userForm.controls.time.value;
    this.panel.coordinator = this.userForm.controls.coordinator.value;
    this.panel.leader = this.userForm.controls.leader.value;
    this.panel.member1 = this.userForm.controls.member1.value;
    this.panel.member2 = this.userForm.controls.member2.value;
    this.panel.member3 = this.userForm.controls.member3.value;
    this.panel.member4 = this.userForm.controls.member4.value;
    this.panel.member5 = this.userForm.controls.member5.value;
    this.panel.active = this.userForm.controls.active.value;

    this.postPanelsForm(this.panel);
    this.resetUserForm(form.value);
  }

  postPanelsForm(panel: Panels) {
    this.panelsService.addPanels(panel)
      .then(res => {
        // update UI
      });
  }

  resetUserForm(form: NgForm) {
  }

  deletePanel(event: any) {
    const panelId = event.target.getAttribute('id');
    this.adminService.deleteDatabaseItem('Panels', panelId);
  }



}
