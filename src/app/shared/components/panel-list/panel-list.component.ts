import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { observable, Observable, of, Subscription } from 'rxjs';
import { AdminMember } from 'src/app/model/AdminMember';
import { Panel } from 'src/app/model/Panel';
import { SortByPipe } from 'src/app/sort-by.pipe';
import { PanelService } from '../../services/panel.service';
import * as XLSX from 'xlsx'
import { FilterByPipe } from 'src/app/filter-by.pipe';
import { AsyncPipe } from '@angular/common';
import { UserService } from 'src/app/core/user.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss'],
})
export class PanelListComponent implements OnInit, OnDestroy {
  @Output()
  edit = new EventEmitter<Panel>();

  panels$: Observable<Panel[]>;

  shownPanels$: Observable<Panel[]>;

  sortDirection: boolean = true

  id: string = window.location.href.split("#")[0]

  pageWidth: number = window.innerWidth

  filterType: string = "panel"

  userEmail: any

  adminList$: Observable<AdminMember[]>

  private subscriptions = new Subscription();

  constructor(
    private panelService: PanelService,
    private sortBy: SortByPipe,
    private eleRef: ElementRef,
    private filterBy: FilterByPipe,
    private currentUser: UserService,
    private adminService: AdminService,
    ) {
    }

  changeBasedOnScreenSize(){
    if(Number(this.pageWidth.toString()[0]) <= 6 && this.pageWidth.toString().length === 3){
      console.log("eleRef", this.eleRef.nativeElement.style["--desired-width"])
      this.eleRef.nativeElement.style.width = "100%"
      this.eleRef.nativeElement.style.setProperty("--desired-width", "100%")
    } else if(Number(window.innerWidth.toString()[0]) > 6) {
      this.eleRef.nativeElement.style.setProperty("--desired-width", "initial")
    }
  }

  findAdmin(email) {
    this.adminList$ = this.adminService.getSpecificAdmin(email)
  }

  async getEmail() {

  }



  ngOnInit() {
    this.panels$ = this.panelService.getPanels();
    this.shownPanels$ = this.panels$
    this.changeBasedOnScreenSize()
    console.log("style", document.querySelector(".panel-list").getAttribute("style"))

    this.panels$.subscribe(panels => {
      this.currentUser.getCurrentUser().then(info => {
        this.findAdmin(info.email)
        this.adminList$.subscribe(admin => {
          var adminCommitment: any = admin[0].commitment
          if(adminCommitment === "Panel Leader"){
            this.shownPanels$ = of(this.filterBy.transform(panels, "panelLeader...email", info.email))
          }
          if(adminCommitment === "Panel Coordinator"){
            this.shownPanels$ = of(this.filterBy.transform(panels, "panelCoordinator...email", info.email))
          }
        })
      })
    })


  }

  filterEmitter(list, property, value){
    console.log("this.filterBy.transform(list, property, value)", this.filterBy.transform(list, property, value))
    this.shownPanels$ =  of(this.filterBy.transform(list, property, value))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onDeleteItem(panel: Panel) {
    this.subscriptions.add(this.panelService.deletePanel(panel.id).subscribe());
  }

  onEditItem(panel: Panel) {
    this.edit.emit(panel);
  }

  getMemberName(user: AdminMember) {
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return '';
  }

  onSortThisBy(action: string, members: AdminMember[]){
    this.sortDirection = !this.sortDirection
    console.log("direction", this.sortDirection)
    this.sortBy.transform(members, action, this.sortDirection)
  }

  /* onFilterThisBy(action: string, members: AdminMember[]){

  } */

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
