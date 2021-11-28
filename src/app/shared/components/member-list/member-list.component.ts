import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminMember } from 'src/app/model/AdminMember';
import { SortByPipe } from 'src/app/sort-by.pipe';
import { SortPanelMembersByFirstNamePipe } from 'src/app/sort-panel-members-by-first-name.pipe';
import { SortPanelMembersByLastNamePipe } from 'src/app/sort-panel-members-by-last-name.pipe';
import { AmdDependency } from 'typescript';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  sortDirection: boolean = true

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


  @Output()
  sortThisBy = new EventEmitter<string>()

  constructor(private sortByFirst: SortPanelMembersByFirstNamePipe, private sortByLast: SortPanelMembersByLastNamePipe, private sortBy: SortByPipe) { }

  ngOnInit() {
  }

  onDeleteItem(member: AdminMember) {
    this.deleteItem.emit(member);
  }

  onEditItem(member: AdminMember) {
    this.editItem.emit(member);
  }

  onSortThisBy(action: string, members: AdminMember[]){
    this.sortDirection = !this.sortDirection
    console.log("direction", this.sortDirection)
    this.sortBy.transform(members, action, this.sortDirection)
  }

  onPrint(elementId: string, printedTitle: string){
    let selectedElement = document.getElementById(elementId).innerHTML
    console.log("selectedElement", selectedElement)
    let originalContent = document.body.innerHTML
    let originalTitle = document.title
    document.body.innerHTML = selectedElement
    document.title = printedTitle
    window.print()
    /* document.body.innerHTML = originalContent
    document.title = originalTitle */
    window.location.reload()
  }

  onExport(fileExtension: string, fileName: string, table: string){
    let selectedTable = document.getElementById(table)
    let spreadSheet = XLSX.utils.table_to_book(selectedTable)
    XLSX.writeFile(spreadSheet, `${fileName}.${fileExtension}`)
  }

}
