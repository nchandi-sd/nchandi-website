import {Component, OnInit} from '@angular/core';
import {PanelService} from './panel.service';
import {Panels} from '../model/Panels';
import {TableData} from '../model/TableData';
import {Opening} from '../model/Opening';
import {Panel} from '../model/Panel';
import {FacilityChampion} from '../model/FacilityChampion';
import {MatTableDataSource} from '@angular/material';


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
  currentPanel: Panel;
  currentPanels: Array<Panel> = [];
  correctionalPanel: Panel;
  correctionalPanels: Array<Panel> = [];
  txChampions: Array<FacilityChampion> = [];
  inChampions: Array<FacilityChampion> = [];
  champs: MatTableDataSource<FacilityChampion>;


  constructor(private panelService: PanelService) {
    this.champs = new MatTableDataSource<FacilityChampion>();
  }

  ngOnInit() {
    this.showOpenings();
    this.showCurrentPanels();
    this.showCorrectionalFacilities();
  }

  // This is all information that should be stored in a backend- not frontend
  getTxContact() {
    this.txChampions[0] = {
      name: 'Jim R',
      phone: '(619) 890-2299',
      email: 'jimbosd619@hotmail.com',
      contactMethod: 'Text',
      type: 'tx'
    };
    this.txChampions[1] = {
      name: 'Brigette L',
      phone: '(714) 269-4476',
      email: 'blabar@cox.net',
      contactMethod: 'Any',
      type: 'tx'
    };
    this.txChampions[2] = {
      name: 'Don C',
      phone: '(760) 212-9759',
      email: 'donald.crites@yahoo.com',
      contactMethod: 'Text',
      type: 'tx'
    };
  }

  getInContact() {
    this.inChampions[0] = {
      name: 'Matthew C',
      phone: '(760) 803-2182',
      email: 'thatguymattewc@gmail.com',
      contactMethod: 'Text',
      type: 'in'
    };
    this.inChampions[1] = {
      name: 'Dan H',
      phone: '(760) 822-6601',
      email: 'dhowardx@yahoo.com',
      contactMethod: 'Any',
      type: 'in'
    };
  }

  showOpenings() {
    this.panelService.getOpenings()
      .subscribe((data: TableData) => {
        data.feed.entry.forEach( ent => {
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
        });
      });
    }

  showCurrentPanels() {
    this.panelService.getCurrentPanels()
      .subscribe((data: Panels) => {
        data.feed.entry.forEach( ent => {
          this.currentPanel = {
            facility: ent.gsx$facility.$t,
            location: ent.gsx$location.$t,
            day: ent.gsx$day.$t,
            time: ent.gsx$time.$t,
            gender: ent.gsx$gender.$t,
            panelCoordinator: ent.gsx$panelcoordinator.$t,
            boardChampion: ent.gsx$boardchampion.$t
          };
          this.currentPanels.push(this.currentPanel);
        });
      });
  }

  showCorrectionalFacilities() {
    this.panelService.getCorrectionalFacilities()
      .subscribe((data: Panels) => {
        data.feed.entry.forEach( ent => {
          this.correctionalPanel = {
            facility: ent.gsx$facility.$t,
            location: ent.gsx$location.$t,
            day: ent.gsx$day.$t,
            time: ent.gsx$time.$t,
            gender: ent.gsx$gender.$t,
            panelCoordinator: ent.gsx$panelcoordinator.$t,
            boardChampion: ent.gsx$boardchampion.$t
          };
          this.correctionalPanels.push(this.correctionalPanel);
        });
      });
  }
}






