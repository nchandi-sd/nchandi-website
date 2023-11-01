import {Component, OnInit} from '@angular/core';
import {Event} from '../model/Event';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements OnInit {
  public clickedEvent: Event;

  constructor() {
  }

  ngOnInit() {
  }

  childEventClicked(event: Event) {
    this.clickedEvent = event;
    console.log("event", event)
  }
}
