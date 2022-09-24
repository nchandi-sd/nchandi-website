import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FilterByPipe } from 'src/app/filter-by.pipe';

interface filterArguments {
  list: any[],
  property: string,
  value: any
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {


  @Input() filterType: string

  @Input() list 

  @Output()
  filter = new EventEmitter()

  @Output()
  search = new EventEmitter()

  filterProperty: string

  filterValue: string

  @Input() listOfNames

  constructor(private filterBy: FilterByPipe) { }

  ngOnInit() {
  }
  
  consoleProperty(){
    console.log("property", this.filterProperty)
    console.log("value", this.filterValue)
    var searchData = {list: this.list, property: this.filterProperty}
    this.search.emit(searchData)

  }

  /* onSearchBy(list: any[], property, value){
    var searchData: filterArguments = {list: list, property: property, value: value}
    this.search.emit(searchData)
  } */

  onFilterBy(list, property, value){

    var filterData: filterArguments = {list: list, property: property, value: value}
    this.filter.emit(filterData)
    /* console.log("list", list)
    console.log("results", this.filterBy.transform(list, property, value))
    return this.filterBy.transform(list, property, value) */
  }

}
