import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { EVENTS} from '../../Model/Meeting-Events';
import {Event} from '../../Model/Event';
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
  }

  onClick(event: Event): void {
    this.eventClicked.emit(event);
  }
}
