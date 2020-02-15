import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../resources/resource.service';
import {Announcement} from '../model/Announcement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cardOneClicked = false;
  cardTwoClicked = false;

  announcements: Announcement[] = null;

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.resourceService.getAnnouncements().subscribe(data => {
      this.announcements = data.map(e => {
        console.log('started retreiving announcements from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Announcement;
      });
      this.announcements.forEach(value => {
        console.log(value.body.length + ' for ' + value.title);
        if (value.body.length > 255) {
          value.hasLongSummary = true;
          console.log(value.title + ' has a long summary');
        } else {
          value.hasLongSummary = false;
          console.log(value.title + ' does NOT have a long summary');
        }
      });
      console.log('finished retrieving announcements');
    });
  }

  visitMailChimpForm() {
    window.open('https://nchandi.us17.list-manage.com/subscribe?u=8b53d42bca70b30fb05bf82e0&id=3e792febdf');
  }

  cardViewClicked(value: any, announcement: Announcement) {
    console.log(value + ' clicked');
    announcement.isExpanded = !announcement.isExpanded;
  }

  // hasLongSummary(announcement: Announcement): boolean {
  //   return (announcement.body.length > 255);
  // }

}
