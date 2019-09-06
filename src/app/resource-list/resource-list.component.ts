import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Resource } from '../model/Resource';
import { GENERAL_RESOURCES } from '../model/General-Resources';
import { MONTHLY_REPORTS } from '../model/Monthly-Reports';
import { CommitteeReport } from '../model/CommitteeReport';
import {ResourceService} from '../resources/resource.service';
import {PanelMaterials} from '../model/Panel-Materials';
import { MonthlyReport } from '../model/MonthlyReport';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @Input() selectedResouce: string;
  @Input() availableResources: string[];

  monthlyReports: MonthlyReport[] = null;
  panelMaterials: PanelMaterials[] = null;
  generalResources: PanelMaterials[] = null;
  committeeReports: Array<CommitteeReport> = [];

  constructor(private resourceService: ResourceService) {}

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
        console.log('retrieved monthly reports from firestore: '+e.payload.doc.id);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as MonthlyReport;
      });

    // sort reports by timestamp added
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
              this.committeeReports[j].minId = this.monthlyReports[i].id;
              this.committeeReports[j].minLink = this.monthlyReports[i].url;
              this.committeeReports[j].minutes = this.monthlyReports[i].title;
            } else if (this.monthlyReports[i].title.endsWith('Report')) {
              this.committeeReports[j].finId = this.monthlyReports[i].id;
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
          report.minId = this.monthlyReports[i].id;
          report.minLink = this.monthlyReports[i].url;
          report.minutes = this.monthlyReports[i].title;
        } else if (this.monthlyReports[i].title.endsWith('Report')) {
          report.finId = this.monthlyReports[i].id;
          report.finLink = this.monthlyReports[i].url;
          report.financialReport = this.monthlyReports[i].title;
        }
      }
    }
  });
  }

  deleteItem(event: any){
    let id = event.target.getAttribute("id")
    let type = event.target.getAttribute("type")
    if(type === this.availableResources[0]){
      this.resourceService.deleteItem("Panel Materials", id)
    }else if(type ===this.availableResources[1]){
      this.resourceService.deleteItem("General Resources", id)
    }else if(type ===this.availableResources[2]){
      this.resourceService.deleteItem("Monthly Reports", id)
      this.committeeReports.forEach(report => {
        if(report.finId === id){
          report.finId = null
          report.finLink = null
          report.financialReport = null
        }else if(report.minId === id){
          report.minId = null
          report.minLink = null
          report.minutes = null
        }
      })
    }
    

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
