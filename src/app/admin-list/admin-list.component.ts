import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../resources/resource.service';
import {AdminMember} from '../model/AdminMember';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  members: AdminMember[] = null;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getAdminList().subscribe(data => {
      this.members = data.map(e => {
        console.log('retrieved admins from firestore');
        // @ts-ignore
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as AdminMember;
      });
    });
  }

  deleteItem(event: any) {
    const id = event.target.getAttribute('id');
    this.resourceService.deleteDatabaseItem('Admin', id);
  }

}
