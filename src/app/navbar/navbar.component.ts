import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarid') private navbaridRef: any;

  onClick(event): void {
    if (this.navbaridRef.shown) {
      this.navbaridRef.toggle(event);
    }
  }
  constructor() {
  }

  ngOnInit() {
  }

}
