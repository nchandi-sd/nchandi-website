import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Facility } from 'src/app/model/Facility';
import { FacilityDialogComponent } from 'src/app/shared/components/facility-dialog/facility-dialog.component';
import { FacilitiesService } from 'src/app/shared/services/facilities.service';

@Component({
  selector: 'app-facilities-dashboard',
  templateUrl: './facilities-dashboard.component.html',
  styleUrls: ['./facilities-dashboard.component.scss'],
})
export class FacilitiesDashboardComponent implements OnInit, OnDestroy {
  correctionalFacilities$: Observable<Facility[]>;

  private subscription = new Subscription();

  constructor(
    private facilities: FacilitiesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.correctionalFacilities$ = this.facilities.getFacilities();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFacilityEdit(facility: Facility) {
    this.editItem$(facility).subscribe(result => {
      if (result) {
        this.updateItem(result);
      }
    });
  }

  onFacilitySubmit(facility: Facility) {
    this.subscription.add(this.facilities.addFacility(facility).subscribe());
  }

  private updateItem(facility: Facility) {
    this.subscription.add(
      this.facilities.updateFacility(facility.id, facility).subscribe()
    );
  }

  private editItem$(facility: Facility) {
    const dialogRef = this.dialog.open(FacilityDialogComponent, {
      width: '400px',
      height: '650px',
      data: {
        facility,
      },
    });

    return dialogRef.afterClosed();
  }
}
