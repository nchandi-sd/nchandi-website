import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Facility } from 'src/app/model/Facility';

export interface FacilityDialogContract {
  facility: Facility;
}

@Component({
  selector: 'app-facility-dialog',
  templateUrl: './facility-dialog.component.html',
  styleUrls: ['./facility-dialog.component.scss'],
})
export class FacilityDialogComponent {
  facility?: Facility;

  private facilityId?: string;

  constructor(
    private dialogRef: MatDialogRef<FacilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: FacilityDialogContract
  ) {
    if (this.data && this.data.facility) {
      this.facility = this.data.facility;
      this.facilityId = this.facility.id;
    }
  }

  onCancelButtonClick() {
    this.dialogRef.close(undefined);
  }

  onSaveButtonClick(facility: Facility) {
    facility.id = this.facilityId;
    this.dialogRef.close(facility);
  }
}
