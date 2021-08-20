import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminMember } from 'src/app/model/AdminMember';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  @Input()
  title = '';

  @Input()
  hasCommitment = true;

  @Input()
  members: AdminMember[];

  @Output()
  deleteItem = new EventEmitter<AdminMember>();

  @Output()
  editItem = new EventEmitter<AdminMember>();

  constructor() { }

  ngOnInit() {
  }

  onDeleteItem(member: AdminMember) {
    this.deleteItem.emit(member);
  }

  onEditItem(member: AdminMember) {
    this.editItem.emit(member);
  }
}
