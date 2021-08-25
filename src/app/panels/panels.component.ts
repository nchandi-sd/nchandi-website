import { Component, OnInit } from '@angular/core';
import { Panel } from '../model/Panel';
import { PanelService } from '../shared/services/panel.service';
import { Observable } from 'rxjs';
import { Facility } from '../model/Facility';
import { FacilitiesService } from '../shared/services/facilities.service';
import { AdminMember } from '../model/AdminMember';

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
    name: 'Don C',
    phone: '(760) 212-9759',
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

  constructor(
    private panelService: PanelService,
    private facilitiesService: FacilitiesService
  ) {}

  ngOnInit() {
    this.openPanels$ = this.panelService.getOpenPanels();
    this.treatmentFacilities$ = this.facilitiesService.getTreatmentFacilities();
    this.correctionalFacilities$ =
      this.facilitiesService.getCorrectionalFacilities();
  }

  getMemberName(user: AdminMember) {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return '';
  }
}
