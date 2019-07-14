import { Component, OnInit } from '@angular/core';
import {Event} from '../model/Event';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }
  public clickedEvent: Event;

  ngOnInit() {
  }

  childEventClicked(event: Event) {
    this.clickedEvent = event;
  }
}
