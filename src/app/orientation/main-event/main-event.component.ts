import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../model/Event';

@Component({
  selector: 'app-main-event',
  templateUrl: './main-event.component.html',
  styleUrls: ['./main-event.component.scss']
})
export class MainEventComponent implements OnInit {

  constructor() { }
  @Input() event: Event;
  ngOnInit() {
  }

}
