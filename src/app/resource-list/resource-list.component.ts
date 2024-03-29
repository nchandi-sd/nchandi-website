import { Component, OnInit, Input } from '@angular/core';
import { CommitteeReport } from '../model/CommitteeReport';
import { ResourceService } from '../resources/resource.service';
import { PanelMaterials } from '../model/Panel-Materials';
import { MonthlyReport } from '../model/MonthlyReport';
import { Announcement } from '../model/Announcement';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})
export class ResourceListComponent implements OnInit {
  @Input() selectedResouce: string;
  @Input() availableResources: string[];

  monthlyReports: MonthlyReport[] = null;
  panelMaterials: PanelMaterials[] = null;
  generalResources: PanelMaterials[] = null;
  archiveReports: PanelMaterials[] = null;
  committeeReports: Array<CommitteeReport> = [];
  announcements: Announcement[] = null;
  currentAnnoucement: Announcement = new Announcement();

  cardView = false;

  constructor(private resourceService: ResourceService) {}

  ngOnInit() {
    this.resourceService.getPanelMaterials().subscribe((data) => {
      this.panelMaterials = data.sort((a, b) => a.order - b.order);
    });

    this.resourceService.getGeneralResources().subscribe((data) => {
      this.generalResources = data.sort((a, b) => a.order - b.order);
    });

    this.resourceService.getAnnouncements().subscribe((data) => {
      this.announcements = data;
    });

    this.resourceService.getArchivedReports().subscribe((data) => {
      this.archiveReports = data;
    });

    this.resourceService.getMonthlyReports().subscribe((data) => {
      this.monthlyReports = data;

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
        let containsReport = false;

        for (let j = 0; j < this.committeeReports.length; j++) {
          if (
            this.committeeReports[j].monthDate ===
            this.getStringMonth(this.monthlyReports[i].month)
          ) {
            containsReport = true;
            if (this.monthlyReports[i].title.endsWith('Minutes')) {
              this.committeeReports[j].minId = this.monthlyReports[i].id;
              this.committeeReports[j].minLink = this.monthlyReports[i].url;
              this.committeeReports[j].minutes = this.monthlyReports[i].title;
            } else if (this.monthlyReports[i].title.endsWith('Report')) {
              this.committeeReports[j].finId = this.monthlyReports[i].id;
              this.committeeReports[j].finLink = this.monthlyReports[i].url;
              this.committeeReports[j].financialReport =
                this.monthlyReports[i].title;
            }
          }
        }

        if (!containsReport) {
          const report = new CommitteeReport();
          this.committeeReports.push(report);
          report.monthDate = this.getStringMonth(this.monthlyReports[i].month);
          report.monthInt = this.monthlyReports[i].month;
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

      this.committeeReports.sort(function (a, b) {
        if (a.monthInt < b.monthInt) {
          return -1;
        }
        if (a.monthInt > b.monthInt) {
          return 1;
        }
        return 0;
      });
    });
  }

  panelListItemDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.panelMaterials,
      event.previousIndex,
      event.currentIndex
    );

    for (let i = 0; i < this.panelMaterials.length; i++) {
      if (this.panelMaterials[i].order != i) this.panelMaterials[i].order = i;
    }

    this.resourceService.updatePanelMaterialsList(this.panelMaterials);
  }

  resourceItemDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.generalResources,
      event.previousIndex,
      event.currentIndex
    );

    for (let i = 0; i < this.generalResources.length; i++) {
      if (this.generalResources[i].order != i)
        this.generalResources[i].order = i;
    }

    this.resourceService.updateGeneralResourceList(this.generalResources);
  }

  deleteItem(event: any) {
    const id = event.target.getAttribute('id');
    const type = event.target.getAttribute('type');
    if (type === this.availableResources[0]) {
      this.resourceService.deleteItem('Panel Materials', id);
    } else if (type === this.availableResources[1]) {
      this.resourceService.deleteItem('General Resources', id);
    } else if (type === this.availableResources[2]) {
      this.resourceService.deleteItem('Monthly Reports', id);
      this.committeeReports.forEach(function (report, index, obj) {
        if (report.finId === id) {
          report.finId = null;
          report.finLink = null;
          report.financialReport = null;
        } else if (report.minId === id) {
          report.minId = null;
          report.minLink = null;
          report.minutes = null;
        }

        if (!report.finId && !report.minId) {
          obj.splice(index, 1);
          index = index - 1;
        }
      });
    } else if (type === this.availableResources[3]) {
      console.log('Deleting announcement');
      this.resourceService.deleteDatabaseItem('Announcements', id);
    } else if (type === this.availableResources[4]) {
      console.log('Deleting archive report');
      this.resourceService.deleteItem('Archived Reports', id);
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

  openCard(announcement: Announcement) {
    this.currentAnnoucement.title = announcement.title;
    this.currentAnnoucement.date = '12/2/2019';
    this.currentAnnoucement.body = announcement.fullBody;
    this.cardView = true;
  }
}
