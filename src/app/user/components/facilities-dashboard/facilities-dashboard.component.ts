import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Facility } from 'src/app/model/Facility';
import { FacilitiesService } from 'src/app/shared/services/facilities.service';

@Component({
  selector: 'app-facilities-dashboard',
  templateUrl: './facilities-dashboard.component.html',
  styleUrls: ['./facilities-dashboard.component.scss'],
})
export class FacilitiesDashboardComponent implements OnInit {
  correctionalFacilities$: Observable<Facility[]>;

  constructor(private facilities: FacilitiesService) {}

  ngOnInit() {
    this.correctionalFacilities$ = this.facilities.getFacilities();
  }
}
