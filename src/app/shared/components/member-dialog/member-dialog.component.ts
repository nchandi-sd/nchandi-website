import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminMember } from 'src/app/model/AdminMember';

export interface MemberDialogContract {
  member: AdminMember;
  isAdmin: boolean;
}

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss'],
})
export class MemberDialogComponent {
  member?: AdminMember;
  isAdmin = false;

  private memberId?: string;

  constructor(
    private dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: MemberDialogContract
  ) {
    if (this.data && this.data.member) {
      this.member = this.data.member;
      this.isAdmin = this.data.isAdmin;
      this.memberId = this.member.id;
    }
  }

  onCancelButtonClick() {
    this.dialogRef.close(undefined);
  }

  onSaveButtonClick(member: AdminMember) {
    member.id = this.memberId;
    this.dialogRef.close(member);
  }
}
