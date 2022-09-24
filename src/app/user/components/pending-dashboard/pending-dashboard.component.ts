import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterByPipe } from 'src/app/filter-by.pipe';
import { PendingService } from 'src/app/shared/services/pending.service';
import { SortByPipe } from 'src/app/sort-by.pipe';

@Component({
  selector: 'app-pending-dashboard',
  templateUrl: './pending-dashboard.component.html',
  styleUrls: ['./pending-dashboard.component.scss']
})
export class PendingDashboardComponent implements OnInit {

  pending$: Observable<any[]>
  shownPending$
  sortDirection: boolean = true
  listOfNames: any[]

  constructor(
    private pendingService: PendingService,
    private sortBy: SortByPipe,
    private filterBy: FilterByPipe
  ) { }

  ngOnInit() {
    this.pending$ = this.pendingService.getVolunteers()
    this.shownPending$ = this.pending$
  }

  onSortThisBy(action: string, arr: any[]) {
    this.sortDirection = !this.sortDirection
    console.log("direction", this.sortDirection)
    this.sortBy.transform(arr, action, this.sortDirection)
  }

  filterEmitter(list, property, value){
    console.log("this.filterBy.transform(list, property, value)", this.filterBy.transform(list, property, value))
    typeof value === "string" && console.log("empty length", value.length)
    this.shownPending$ = of(this.filterBy.transform(list, property, value))
  }

  searchEmitter(pending, property){
    var collectionOfNames = {}
    console.log("members", pending)
    pending.map(member => collectionOfNames[member.firstName + " " + member.lastName] = 1)
    this.listOfNames = Object.keys(collectionOfNames)
  }

  approve(volunteer: any){
    var check = confirm(`Do you want to allow this ${volunteer.firstName + " " + volunteer.lastName} to become a panel member?`)
    if(check){
      this.pendingService.approveVolunteer(volunteer)
    }
  }

  reject(volunteer: any){
    var check = confirm(`Do you want to remove ${volunteer.firstName + " " + volunteer.lastName}?`)
    if(check){
      this.pendingService.deleteVolunteer(volunteer.id)
    }
  }

}
