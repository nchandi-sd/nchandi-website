import { Component, OnInit } from '@angular/core';
import { Panel } from '../model/Panel';
import { PanelService } from '../shared/services/panel.service';
import { Observable } from 'rxjs';
import { Facility } from '../model/Facility';
import { FacilitiesService } from '../shared/services/facilities.service';

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
  currentPanels$: Observable<Panel[]>;
  openPanels$: Observable<Panel[]>;
  correctionalFacilities$: Observable<Facility[]>;
  panelOpeningContacts = PANEL_OPENING_CONTACTS;
  isTableOpen = false;

  constructor(
    private panelService: PanelService,
    private facilitiesService: FacilitiesService
  ) {}

  ngOnInit() {
    this.currentPanels$ = this.panelService.getCurrentPanels();
    this.openPanels$ = this.panelService.getOpenPanels();
    this.correctionalFacilities$ = this.facilitiesService.getFacilities();
  }
}
