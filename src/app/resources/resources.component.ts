import { Component, OnInit } from '@angular/core';
import {MONTHLY_REPORTS} from '../model/Monthly-Reports';
import {CommitteeReport} from '../model/CommitteeReport';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';
import {AngularFireStorage} from '@angular/fire/storage';
import {PanelMaterials} from '../model/Panel-Materials';
import {ResourceService} from './resource.service';
import {MonthlyReport} from '../model/MonthlyReport';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  monthlyReports: MonthlyReport[] = null;
  firstTriReports: MonthlyReport[] = null;
  secTriReports: MonthlyReport[] = null;
  thirdTriReports: MonthlyReport[] = null;
  committeeReports = Array<CommitteeReport>();
  panelMaterials: PanelMaterials[] = null;
  generalResources: PanelMaterials[] = null;
  counter: number;



  constructor(private storage: AngularFireStorage,
              private resourceService: ResourceService) {}
  ngOnInit() {
    this.resourceService.getPanelMaterials().subscribe(data => {
      this.panelMaterials = data.map(e => {
        console.log('retrieved from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PanelMaterials;
      });
    });

    this.resourceService.getGeneralResources().subscribe(data => {
      this.generalResources = data.map(e => {
        console.log('retrieved from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PanelMaterials;
      });
    });

    this.resourceService.getMonthlyReports().subscribe(data => {
      this.monthlyReports = data.map(e => {
        console.log('retrieved monthly reports from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as MonthlyReport;
      });
      // sort reports by timestamp added
      this.monthlyReports.sort(function (a, b) {
        if (a.timestamp < b.timestamp) { return -1; }
        if (a.timestamp > b.timestamp) { return 1; }
        return 0;
      });

      for (let i = 0; i < this.monthlyReports.length - 1; i++) {
        const report = new CommitteeReport();
        this.committeeReports.push(report);
        this.committeeReports[i].monthDate = this.monthlyReports[i].month;
        if (i % 2 !== 0) {
          this.committeeReports[i].minLink = this.monthlyReports[i].url;
          this.committeeReports[i].minutes = this.monthlyReports[i].title;
        } else {
          this.committeeReports[i].finLink = this.monthlyReports[i].url;
          this.committeeReports[i].financialReport = this.monthlyReports[i].title;
        }
      }

      this.committeeReports.forEach(item => {
        console.log(item);
      });
    });
  }
}

