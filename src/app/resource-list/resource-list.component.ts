import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Resource } from '../model/Resource';
import { GENERAL_RESOURCES } from '../model/General-Resources';
import { PANEL_MATERIALS } from '../model/Panel-Materials';
import { MONTHLY_REPORTS } from '../model/Monthly-Reports';
import { CommitteeReport } from '../model/CommitteeReport';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @Input() selectedResouce: string
  @Input() availableResources: string[]

  listItems: string[] = []
  generalResources: Array<Resource> = GENERAL_RESOURCES
  panelMaterials: Array<Resource> = PANEL_MATERIALS
  monthlyReports: Array<CommitteeReport> = MONTHLY_REPORTS

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    for (let property in changes) {
      if (property === 'selectedResouce') {
        
      }
    }
  }

}
