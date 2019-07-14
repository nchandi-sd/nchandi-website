import {Component, OnInit} from '@angular/core';
import {PanelService} from './panel.service';
import {Panels} from '../model/Panels';
import {TableData} from '../model/TableData';
import {Opening} from '../model/Opening';
import {Panel} from '../model/Panel';

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

  constructor(private panelService: PanelService) {
  }

  ngOnInit() {
    this.showOpenings();
    this.showCurrentPanels();
    this.showCorrectionalFacilities();
  }

  showOpenings() {
    this.panelService.getOpenings()
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
        });
      });
    }

  showCurrentPanels() {
    this.panelService.getCurrentPanels()
      .subscribe((data: Panels) => {
        data.feed.entry.forEach( ent => {
          console.log(ent.content.$t);
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
          console.log(this.currentPanel);
        });
      });
  }

  showCorrectionalFacilities() {
    this.panelService.getCorrectionalFacilities()
      .subscribe((data: Panels) => {
        data.feed.entry.forEach( ent => {
          console.log(ent.content.$t);
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
          console.log(this.correctionalPanel);
        });
      });
  }
}






