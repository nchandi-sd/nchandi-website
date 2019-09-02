import { Component, OnInit } from '@angular/core';
import {MONTHLY_REPORTS} from '../model/Monthly-Reports';
import {CommitteeReport} from '../model/CommitteeReport';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';
import {AngularFireStorage} from '@angular/fire/storage';
import {PanelMaterials} from '../model/Panel-Materials';
import {ResourceService} from './resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  firstTriReports: Array<CommitteeReport> = [];
  secTriReports: Array<CommitteeReport> = [];
  thirdTriReports: Array<CommitteeReport> = [];

  panelMaterials: PanelMaterials[] = null;
  generalResources: PanelMaterials[] = null;


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

    // first 4 reports to be added to the first column
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
