import { Component, OnInit } from '@angular/core';
import { Panel } from '../model/Panel';
import { PanelService } from '../shared/services/panel.service';
import { Observable } from 'rxjs';
import { Facility } from '../model/Facility';
import { FacilitiesService } from '../shared/services/facilities.service';
import { AdminMember } from '../model/AdminMember';
import { SortByPipe } from '../sort-by.pipe';

const PANEL_OPENING_CONTACTS = [
  /*
  {
    name: 'Brigette L',
    phone: '(714) 269-4476',
    email: 'northcountyhandi@gmail.com',
    contactMethod: 'Any',
    type: 'tx',
  },
  */
  {
    name: 'David P',
    phone: '(626) 200-0254',
    email: 'northcountyhandi@gmail.com',
    contactMethod: 'Text',
    type: 'tx',
  },
];

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss'],
})
export class PanelsComponent implements OnInit {
  openPanels$: Observable<Panel[]>;
  correctionalFacilities$: Observable<Facility[]>;
  treatmentFacilities$: Observable<Facility[]>;
  panelOpeningContacts = PANEL_OPENING_CONTACTS;
  isTableOpen = false;
  sortDirection: boolean = true

  constructor(
    private panelService: PanelService,
    private facilitiesService: FacilitiesService,
    private sortBy: SortByPipe,
  ) {}

  ngOnInit() {
    this.openPanels$ = this.panelService.getOpenPanels();
    this.treatmentFacilities$ = this.facilitiesService.getTreatmentFacilities();
    this.correctionalFacilities$ =
    this.facilitiesService.getCorrectionalFacilities();

    this.openPanels$.subscribe(value => console.log("openPanels$", value))
  }

  getMemberName(user: AdminMember) {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return '';
  }

  onSortThisBy(action: string, arr: any[]) {
    this.sortDirection = !this.sortDirection
    console.log("direction", this.sortDirection)
    this.sortBy.transform(arr, action, this.sortDirection)
  }
}
