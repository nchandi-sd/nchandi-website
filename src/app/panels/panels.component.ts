import {Component, OnInit} from '@angular/core';
import {PanelService, TableData} from './panel.service';

interface Opening {
  dayOfWeek: string;
  weekOfMonth: string;
  time: string;
  facility: string;
  location: string;
  gender: string;
  positionsAvailable: string;
  panelCoordinator: string;
  boardChampion: string;
}

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})

export class PanelsComponent implements OnInit {
  error: any;
  entries: TableData[];
  opening: Opening;
  openings: Array<Opening> = [];

  constructor(private panelService: PanelService) {
  }

  ngOnInit() {
    this.showOpenings2();
  }

  showOpenings2() {
    this.panelService.getOpenings2()
      .subscribe((data: TableData) => {
        data.feed.entry.forEach( ent => {
          console.log(ent.content.$t);
          this.opening = {
            dayOfWeek: ent.gsx$dayofweek.$t,
            weekOfMonth: ent.gsx$weekofmonth.$t,
            time: ent.gsx$time.$t,
            facility: ent.gsx$facility.$t,
            location: ent.gsx$location.$t,
            positionsAvailable: ent.gsx$needed.$t,
            gender: ent.gsx$menwomen.$t,
            panelCoordinator: ent.gsx$panelcoordinator.$t,
            boardChampion: ent.gsx$boardchampion.$t
          };
          this.openings.push(this.opening);
          console.log(this.opening);
        });
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





