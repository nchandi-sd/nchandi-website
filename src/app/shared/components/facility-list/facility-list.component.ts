import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Facility } from 'src/app/model/Facility';
import { FacilitiesService } from '../../services/facilities.service';

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss']
})
export class FacilityListComponent implements OnInit, OnDestroy {
  @Output()
  edit = new EventEmitter<Facility>();

  facilities$: Observable<Facility[]>;

  private subscriptions = new Subscription();

  constructor(private facilitiesService: FacilitiesService) {}

  ngOnInit() {
    this.facilities$ = this.facilitiesService.getFacilities();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onDeleteItem(facility: Facility) {
    this.subscriptions.add(
      this.facilitiesService.deleteFacility(facility.id).subscribe()
    );
  }

  onEditItem(facility: Facility) {
    this.edit.emit(facility);
  }
}
