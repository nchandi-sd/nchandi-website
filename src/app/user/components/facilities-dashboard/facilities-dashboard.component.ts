import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Facility } from 'src/app/model/Facility';
import { PanelService } from 'src/app/shared/services/panel.service';

@Component({
  selector: 'app-facilities-dashboard',
  templateUrl: './facilities-dashboard.component.html',
  styleUrls: ['./facilities-dashboard.component.scss'],
})
export class FacilitiesDashboardComponent implements OnInit {
  correctionalFacilities$: Observable<Facility[]>;

  constructor(private panelService: PanelService) {}

  ngOnInit() {
    this.correctionalFacilities$ = this.panelService.getFacilities();
  }
}
