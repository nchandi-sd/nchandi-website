import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { AdminMember } from 'src/app/model/AdminMember';
import { PanelMemberService } from 'src/app/shared/services/panel-member.service';

@Component({
  selector: 'app-panel-member-list',
  templateUrl: './panel-member-list.component.html',
  styleUrls: ['./panel-member-list.component.scss'],
})
export class PanelMemberListComponent implements OnInit, OnDestroy {
  @Output()
  edit = new EventEmitter<AdminMember>();

  members$: Observable<AdminMember[]>;
  test: boolean = true

  private subscriptions = new Subscription();

  constructor(private resourceService: PanelMemberService) {}

  ngOnInit() {
    this.members$ = this.resourceService.getPanelMembers()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  deleteItem(member: AdminMember) {
    this.subscriptions.add(
      this.resourceService.deletePanelMember(member.id).subscribe()
    );
  }

  editItem(member: AdminMember) {
    this.edit.emit(member);
  }
}
