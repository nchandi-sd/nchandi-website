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
  currentEvent = this.events[0];

  ngOnInit() {
    this.eventClicked.emit(this.currentEvent);
    console.log('First Event is ' + this.currentEvent.name);
    console.log('number of events ' + this.events.length);
    this.filterEvents();

  }

  // Quick fix to make the page look better if more than 6 dates are showing (It pushes down the "Sobriety Requirements...)
  filterEvents() {
    switch (this.events.length) {
      case 12: {
        const toBeRemoved = this.events.length - 6;
        this.events = this.events.splice(0, toBeRemoved);
        break;
      }
      case 11: {
        const toBeRemoved = this.events.length - 5;
        this.events = this.events.splice(0, toBeRemoved);
        break;
      }
      case 10: {
        const toBeRemoved = this.events.length - 4;
        this.events = this.events.splice(0, toBeRemoved);
        break;
      }
      case 9: {
        const toBeRemoved = this.events.length - 3;
        this.events = this.events.splice(0, toBeRemoved);
        break;
      }
      case 8: {
        const toBeRemoved = this.events.length - 2;
        this.events = this.events.splice(0, toBeRemoved);
        break;
      }
      case 7: {
        const toBeRemoved = this.events.length - 1;
        this.events = this.events.splice(0, toBeRemoved);
        break;
      }
      default: {
        console.log('No meetings to remove from queue ' + this.currentEvent.name);
      }
    }
  }

  onClick(event: Event): void {
    // Locking ability to click on dates and show those in Main Event component
    // this.eventClicked.emit(event);
  }
}
