import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  filterProperty: string

  filterValue: string

  constructor(private filterBy: FilterByPipe) { }

  ngOnInit() {

  }

  consoleProperty(){
    console.log("property", this.filterProperty)
    console.log("value", this.filterValue)
  }

  onFilterBy(list, property, value){
    var filterData: filterArguments = {list: list, property: property, value: value}
    this.filter.emit(filterData)
    /* console.log("list", list)
    console.log("results", this.filterBy.transform(list, property, value))
    return this.filterBy.transform(list, property, value) */
  }

}
