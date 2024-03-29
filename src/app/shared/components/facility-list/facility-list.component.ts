import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Facility } from 'src/app/model/Facility';
import { SortByPipe } from 'src/app/sort-by.pipe';
import { FilterByPipe } from 'src/app/filter-by.pipe';
import { FacilitiesService } from '../../services/facilities.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-facility-list',
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss']
})
export class FacilityListComponent implements OnInit, OnDestroy {
  @Output()
  edit = new EventEmitter<Facility>();

  facilities$: Observable<Facility[]>;

  shownFacilities$: Observable<Facility[]>;

  sortDirection: boolean = true;

  private subscriptions = new Subscription();



  constructor(
    private facilitiesService: FacilitiesService,
    private sortBy: SortByPipe,
    private filterBy: FilterByPipe,
    ) {}

  ngOnInit() {
    this.facilities$ = this.facilitiesService.getFacilities();
    this.facilities$.subscribe(value => console.log("value", value))
    this.shownFacilities$ = this.facilities$
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  filterEmitter(list, property, value){
    console.log("this.filterBy.transform(list, property, value)", this.filterBy.transform(list, property, value))
    typeof value === "string" && console.log("empty length", value.length)
    this.shownFacilities$ = of(this.filterBy.transform(list, property, value))
  }

  onDeleteItem(facility: Facility) {
    this.subscriptions.add(
      this.facilitiesService.deleteFacility(facility.id).subscribe()
    );
  }

  onEditItem(facility: Facility) {
    this.edit.emit(facility);
  }

  onSortThisBy(action: string, facilities: Facility[]){
    this.sortDirection = !this.sortDirection
    console.log("direction", this.sortDirection)
    this.sortBy.transform(facilities, action, this.sortDirection)
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
