import { Component, OnInit } from '@angular/core';
import {MONTHLY_REPORTS} from '../model/Monthly-Reports';
import {CommitteeReport} from '../model/CommitteeReport';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';
import {PANEL_MATERIALS} from '../model/Panel-Materials';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  firstTriReports: Array<CommitteeReport> = [];
  secTriReports: Array<CommitteeReport> = [];
  thirdTriReports: Array<CommitteeReport> = [];

  generalResources: Array<Resource> = GENERAL_RESOURCES;
  panelMaterials: Array<Resource> = PANEL_MATERIALS;

  constructor() { }
  ngOnInit() {

    // first six reports to be added to the first column
    for (let i = 0; i < 4; i++) {
      this.firstTriReports.push(MONTHLY_REPORTS[i]);
    }
    for (let i = 4; i < 8; i++) {
      this.secTriReports.push(MONTHLY_REPORTS[i]);
    }
    for (let i = 8; i < 12; i++) {
      this.thirdTriReports.push(MONTHLY_REPORTS[i]);
    }
  }

}
