import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminMember } from 'src/app/model/AdminMember';
import { SortByPipe } from 'src/app/sort-by.pipe';
import { FilterByPipe } from 'src/app/filter-by.pipe';
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
  list: string

  @Input()
  filterType: string

  @Input()
  members: AdminMember[];

  @Input()
  shownMembers: AdminMember[];

  @Output()
  deleteItem = new EventEmitter<AdminMember>();

  @Output()
  editItem = new EventEmitter<AdminMember>();


  @Output()
  sortThisBy = new EventEmitter<string>()

  constructor(private sortBy: SortByPipe, private filterBy: FilterByPipe) {
    console.log("shownMembers", this.shownMembers)
   }

  ngOnInit() {

  }

  onDeleteItem(member: AdminMember) {
    this.deleteItem.emit(member);
  }

  onEditItem(member: AdminMember) {
    this.editItem.emit(member);
  }

  filterEmitter(members, property, value){
    this.shownMembers = this.filterBy.transform(members, property, value)
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
