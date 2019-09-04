import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Resource } from '../model/Resource';
import { GENERAL_RESOURCES } from '../model/General-Resources';
import { MONTHLY_REPORTS } from '../model/Monthly-Reports';
import { CommitteeReport } from '../model/CommitteeReport';
import {ResourceService} from '../resources/resource.service';
import {PanelMaterials} from '../model/Panel-Materials';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @Input() selectedResouce: string;
  @Input() availableResources: string[];

  panelMaterials: PanelMaterials[] = null;
  generalResources: PanelMaterials[] = null;
  monthlyReports: Array<CommitteeReport> = MONTHLY_REPORTS;

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
  }

}
