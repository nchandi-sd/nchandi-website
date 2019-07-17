import { Component, OnInit } from '@angular/core';
import {MONTHLY_REPORTS} from '../model/Monthly-Reports';
import {CommitteeReport} from '../model/CommitteeReport';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';


@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  summerReports: Array<CommitteeReport> = [];
  winterReports: Array<CommitteeReport> = [];
  generalResources: Array<Resource> = GENERAL_RESOURCES;

  constructor() { }
  ngOnInit() {

    // first six reports to be added to the first column
    for (let i = 0; i < 6; i++) {
      this.summerReports.push(MONTHLY_REPORTS[i]);
    }
    for (let i = 6; i < 12; i++) {
      this.winterReports.push(MONTHLY_REPORTS[i]);
    }

    for (let thisone of GENERAL_RESOURCES) {
      console.log(thisone.name);
    }
  }

}
