import {Component, OnInit} from '@angular/core';
import {EntryEntity, PanelService} from './panel.service';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})

export class PanelsComponent implements OnInit {
  error: any;
  entries: EntryEntity[];

  constructor(private panelService: PanelService) {
  }

  ngOnInit() {
    this.showOpenings2();
    // console.log(this.entries[0].gsx$dayofweek);
  }

  // showOpenings() {
  //   this.panelService.getOpenings()
  //     .subscribe((data: OPENINGS) => this.opening = {
  //       dayOfWeek: data['gsx$dayofweek.$t'],
  //       weekOfMonth: data['gsx$weekofmonth.$t'],
  //       time: data['gsx#time.$t'],
  //       facility: data['gsx$facility.$t'],
  //       location: data['gsx$location.$t'],
  //       gender: data['gsx$menwomen.$t'],
  //       numberNeeded: data['gsx$needed.$t'],
  //       panelCordinator: data['gsx$panelcoordinator.$t'],
  //       boardChampion: data['gsx$boardchampion.$t'],
  //     });
  // }

  showOpenings2() {
    this.panelService.getOpenings2()
      .subscribe((data: EntryEntity[]) => entries => {
        this.entries = entries.EntryEntity;
      });
  }

  // showTest() {
  //   let dogs: Array<any> = [];
  //   let count = 0;
  //   this.panelService.getOpenings3()
  //   // clone the data object, using its known shape
  //     .subscribe(next => {
  //       if (next != null) {
  //         dogs = this.transformDogs(next);
  //         count = dogs.length;
  //         console.log(count);
  //       }
  //     });
  // }

  // transformDogs(dataReceived: Array<any>): Array<any> {
  //
  //   console.log(dataReceived);
  //   const tempArray: Array<any> = [];
  //   for (const i of dataReceived) {
  //     console.log(i.gsx$dayofweek.$t);
  //       tempArray.push({
  //       Name: i.gsx$dayofweek.$t,
  //       Breed: i.gsx$weekofmonth.$t,
  //       Birthdate: i.gsx$time.$t,
  //       CurrentAge: i.gsx$facility.$t
  //     });
  //   }
  //   return tempArray;
  //
  // }
}
  // loadDogs(objName: string){
  //
  //   let animalCount = 0;
  //   let dogs: Array<any> = [];
  //   this.openings$ = this.getHTTPData_SS(objName);
  //   this.openings$.subscribe(next => {
  //
  //     if (next != null) {
  //       // transform the JSON returned to make it more usable
  //       dogs = this.transformDogs(next);
  //       animalCount = dogs.length;
  //     }
  //     SpreadsheetDS.setLocal(dogs, this.ssIDs.getCacheName(objName));
  //     this.dogsLabel = this.buildLabel(animalCount, objName);
  //     this.dogsUpdated.emit(dogs);
  //
  //   });
  //
  // }





