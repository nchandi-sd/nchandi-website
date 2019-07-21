import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // footer: boolean;

  constructor(
    // private router: Router,
  ) {}

  // The key here is that we have use the Router module and check what link we are currently
  // on. We set a boolean variable true if we are on any page except home and false if it is
  // on home. Then in HTML we can use ngIf to show the component based on the boolean variable.
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // this.router.events
    //   .subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       this.footer = (event.url !== '/home');
    //     }
    //   });
  }
}
