import {Component, OnInit} from '@angular/core';
import {OPENINGS, PanelService} from './panel.service';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})

export class PanelsComponent implements OnInit {
  error: any;
  opening: OPENINGS;

  constructor(private panelService: PanelService) { }

  ngOnInit() {
    this.showOpenings2();
  }

  showOpenings() {
    this.panelService.getOpenings()
      .subscribe((data: OPENINGS) => this.opening = {
        dayOfWeek: data['heroesUrl'],
        weekOfMonth:  data['textfile'],
        time: data['sas'],
        facility: data['asd'],
        location: data['asd'],
        gender: data['asd'],
        numberNeeded: data['ads'],
        panelCordinator: data['asd'],
        boardChampion: data['asds'],
      });
  }

  showOpenings2() {
    this.panelService.getOpenings2()
    // clone the data object, using its known Config shape
      .subscribe((data: OPENINGS) => this.opening = { ...data });
  }
}

