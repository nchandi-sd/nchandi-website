import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cardOneClicked = false;
  cardTwoClicked = false;

  constructor() {
  }

  ngOnInit() {
  }

  visitMailChimpForm() {
    window.open('https://nchandi.us17.list-manage.com/subscribe?u=8b53d42bca70b30fb05bf82e0&id=3e792febdf');
  }

  cardViewOneClicked() {
    this.cardOneClicked = !this.cardOneClicked;
  }

  cardViewTwoClicked() {
    this.cardTwoClicked = !this.cardTwoClicked;
  }
}
