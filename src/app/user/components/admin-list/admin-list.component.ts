import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AdminMember } from 'src/app/model/AdminMember';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit, OnDestroy {
  @Output()
  edit = new EventEmitter<AdminMember>();

  members$: Observable<AdminMember[]>;

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.members$ = this.adminService.getAdminList();
    this.members$.subscribe(members => console.log("member", members.filter(member => member.firstName === "Alonzo")))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  deleteItem(member: AdminMember) {
    this.subscriptions.add(
      this.adminService.deleteAdminMember(member.id).subscribe()
    );
  }

  editItem(member: AdminMember) {
    this.edit.emit(member);
  }
}
