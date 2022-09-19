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
import { HttpClient } from '@angular/common/http';

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

  listOfNames: any[]

  private subscriptions = new Subscription();

  constructor(
    private panelService: PanelService,
    private sortBy: SortByPipe,
    private eleRef: ElementRef,
    private filterBy: FilterByPipe,
    private currentUser: UserService,
    private adminService: AdminService,
    private http: HttpClient
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
            this.panels$ = of(this.filterBy.transform(panels, "panelLeader...email", info.email))
          }
          if(adminCommitment === "Panel Coordinator"){
            this.shownPanels$ = of(this.filterBy.transform(panels, "panelCoordinator...email", info.email))
            this.panels$ = of(this.filterBy.transform(panels, "panelCoordinator...email", info.email))
          }
          this.panels$.subscribe(panels => console.log("thePanels", panels))
        })
      })
    })


  }

  filterEmitter(list, property, value){
    console.log("this.filterBy.transform(list, property, value)", this.filterBy.transform(list, property, value))
    this.shownPanels$ =  of(this.filterBy.transform(list, property, value))
  }

  searchEmitter(list, property){

    console.log("searchEmitter", list)
    if(property.includes("...")) {
      var propertyParts = property.split("...")
      var listOfNames: any[] = list.map(item => {
        if(item[propertyParts[0]][propertyParts[1]] && item[propertyParts[0]][propertyParts[2]]){
          return item[propertyParts[0]][propertyParts[1]].toLowerCase() + " " + item[propertyParts[0]][propertyParts[2]].toLowerCase()
        }
      })
      var collectionOfNames = {}
      listOfNames.map(name => collectionOfNames[name] = 1)
      this.listOfNames = Object.keys(collectionOfNames)
    } else if(property === "boardChampion") {
      var listOfNames: any[] = list.map(item => item.boardChampion.firstName.toLowerCase() + " " + item.boardChampion.lastName.toLowerCase())
      var collectionOfNames = {}
      listOfNames.map(name => collectionOfNames[name] = 1)
      this.listOfNames = Object.keys(collectionOfNames)
    } else if(property === "panelCoordinator") {
      var listOfNames: any[] = list.map(item => item.panelCoordinator.firstName.toLowerCase() + " " + item.panelCoordinator.lastName.toLowerCase())
      var collectionOfNames = {}
      listOfNames.map(name => collectionOfNames[name] = 1)
      this.listOfNames = Object.keys(collectionOfNames)
    } else if(property === "allMembers") {
      var listOfNames: any[] = list.map(item => item.allMembers.split(";"))
      console.log("allMembers", listOfNames)
      var collectionOfNames = {}
      listOfNames.map(list => list.map(name => collectionOfNames[name] = 1))
      this.listOfNames = Object.keys(collectionOfNames)
    } else if(property === "facility") {
      var listOfNames: any[] = list.map(item => item.facility.facilityName.toLowerCase())
      var collectionOfNames = {}
      listOfNames.map(name => collectionOfNames[name] = 1)
      this.listOfNames = Object.keys(collectionOfNames)
    }

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

  onRemoveMember(panel: Panel, property: string, memberId: string){

    var scope = prompt("Type 'p' if you want to remove this member from this panel.\n Type 'a' if you would like to remove this member from all panels.\n Type 'c' if you would like to cancel")
    if(scope === null || scope === "c"){
      alert("member removal has been cancelled")
    } else {
      this.http.post("https://nchandi-serverless-email.vercel.app/api/remove", {
        panelId: panel.id,
        property: property,
        scope: scope === "p" ? "panel" : "all",
        memberId: memberId
      }).subscribe(res => console.log("res", res))

    }

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
