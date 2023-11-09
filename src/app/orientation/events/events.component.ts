import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { EVENTS} from '../../model/Meeting-Events';
import {Event} from '../../model/Event';
import {SvgIconRegistryService} from 'angular-svg-icon';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<Event>();

  constructor(private iconReg: SvgIconRegistryService) {
    this.iconReg.loadSvg( 'http://localhost:4200/assets/svg/bullet.svg', 'icon');
  }

  events = EVENTS;
  
  /* currentEvent = this.events[0]; */
  currentEvent = this.events.filter((event, index) => {
    const now = new Date().valueOf()
    console.log("event miliseconds", new Date(event.name).valueOf())
    if((index === 0) && now <= new Date(event.name).valueOf()) {
      return event
    }
    if(index !== 0 && now <= new Date(event.name).valueOf()){
      return event
    }
  })

  ngOnInit() {
    this.eventClicked.emit(this.currentEvent[0]);
    this.events = this.currentEvent.slice(0, 6)
  }

  onClick(event: Event): void {
    // Locking ability to click on dates and show those in Main Event component
    // this.eventClicked.emit(event);
  }
}
