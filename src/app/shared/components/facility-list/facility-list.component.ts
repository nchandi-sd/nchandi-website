import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Facility } from 'src/app/model/Facility';
import { SortByPipe } from 'src/app/sort-by.pipe';
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

  sortDirection: boolean = true;

  private subscriptions = new Subscription();

  constructor(private facilitiesService: FacilitiesService, private sortBy: SortByPipe) {}

  ngOnInit() {
    this.facilities$ = this.facilitiesService.getFacilities();
    this.facilities$.subscribe(value => console.log("value", value))
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

  onSortThisBy(action: string, facilities: Facility[]){
    this.sortDirection = !this.sortDirection
    console.log("direction", this.sortDirection)
    this.sortBy.transform(facilities, action, this.sortDirection)
  }
}
