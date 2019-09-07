import { Component, OnInit } from '@angular/core';
import {MONTHLY_REPORTS} from '../model/Monthly-Reports';
import {CommitteeReport} from '../model/CommitteeReport';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';
import {AngularFireStorage} from '@angular/fire/storage';
import {PanelMaterials} from '../model/Panel-Materials';
import {ResourceService} from './resource.service';
import {MonthlyReport} from '../model/MonthlyReport';
import {PanelService} from '../panels/panel.service';
import {Panels} from '../model/Panels';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  facilities: Array<string> = [];
  monthlyReports: MonthlyReport[] = null;
  committeeReports: Array<CommitteeReport> = [];
  panelMaterials: PanelMaterials[] = null;
  generalResources: PanelMaterials[] = null;
  index = 0;


  constructor(private storage: AngularFireStorage,
              private resourceService: ResourceService,
              private panelService: PanelService) {
  }

  ngOnInit() {
    this.panelService.getCurrentPanels()
      .subscribe((data: Panels) => {
        data.feed.entry.forEach( ent => {
          this.facilities[this.index] = ent.gsx$facility.$t.toString();
          this.index++;
        });
        this.facilities = this.facilities.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        });
      });

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
      // sort reports by month
      this.monthlyReports.sort(function (a, b) {
        if (a.month < b.month) {
          return -1;
        }
        if (a.month > b.month) {
          return 1;
        }
        return 0;
      });

      for (let i = 0; i < this.monthlyReports.length; i++) {
        let containsReport: boolean = false

        for(let j = 0; j < this.committeeReports.length; j++){
          if(this.committeeReports[j].monthDate === this.getStringMonth(this.monthlyReports[i].month)){
            containsReport = true;
            if (this.monthlyReports[i].title.endsWith('Minutes')) {
              this.committeeReports[j].minLink = this.monthlyReports[i].url;
              this.committeeReports[j].minutes = this.monthlyReports[i].title;
            } else if (this.monthlyReports[i].title.endsWith('Report')) {
              this.committeeReports[j].finLink = this.monthlyReports[i].url;
              this.committeeReports[j].financialReport = this.monthlyReports[i].title;
            }

          }
        }

      if (!containsReport) {
        let report = new CommitteeReport()
        this.committeeReports.push(report);
        report.monthDate = this.getStringMonth(this.monthlyReports[i].month);
        if (this.monthlyReports[i].title.endsWith('Minutes')) {
          report.minLink = this.monthlyReports[i].url;
          report.minutes = this.monthlyReports[i].title;
        } else if (this.monthlyReports[i].title.endsWith('Report')) {
          report.finLink = this.monthlyReports[i].url;
          report.financialReport = this.monthlyReports[i].title;
        }
      }
    }
    });
  }

 
  getStringMonth(month: number): string {
    if (month === 1) {
      return 'January';
    } else if (month === 2) {
      return 'February';
    } else if (month === 3) {
      return 'March';
    } else if (month === 4) {
      return 'April';
    } else if (month === 5) {
      return 'May';
    } else if (month === 6) {
      return 'June';
    } else if (month === 7) {
      return 'July';
    } else if (month === 8) {
      return 'August';
    } else if (month === 9) {
      return 'September';
    } else if (month === 10) {
      return 'October';
    } else if (month === 11) {
      return 'November';
    } else if (month === 12) {
      return 'December';
    }
  }

}

