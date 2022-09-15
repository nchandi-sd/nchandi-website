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

  listOfNames: any[]

  private subscriptions = new Subscription();

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.members$ = this.adminService.getAdminList();
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

  searchEmitter(members, property){
    var collectionOfNames = {}
    console.log("members", members)
    members.map(member => collectionOfNames[member.firstName + " " + member.lastName] = 1)
    this.listOfNames = Object.keys(collectionOfNames)
  }
}
