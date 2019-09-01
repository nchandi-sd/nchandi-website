import { Component, OnInit } from '@angular/core';
import {MONTHLY_REPORTS} from '../model/Monthly-Reports';
import {CommitteeReport} from '../model/CommitteeReport';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';
import {AngularFireStorage} from '@angular/fire/storage';
import {forEach} from '@angular/router/src/utils/collection';
import {FirebaseListObservable, FirebaseObjectObservable} from '@angular/fire/database-deprecated';
import {AngularFireDatabase} from '@angular/fire/database';
import {PanelMaterials} from '../model/Panel-Materials';
import {query} from '@angular/animations';
import {toPromise} from 'rxjs-compat/operator/toPromise';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TableData} from '../model/TableData';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  firstTriReports: Array<CommitteeReport> = [];
  secTriReports: Array<CommitteeReport> = [];
  thirdTriReports: Array<CommitteeReport> = [];

  generalResources: Array<Resource> = GENERAL_RESOURCES;
  // panelMaterials: Array<Resource> = PANEL_MATERIALS;
  items: FirebaseListObservable<PanelMaterials[]> = null;
  // item: AngularFireObject<any> = null;
  panelUrl: any;



constructor(private storage: AngularFireStorage,
              private https: HttpClient) {

  interface MyObj {
    name: string;
    bucket: string;
    generation: string;
    metageneration: string;
    contentType: string;
    timeCreated: string;
    updated: string;
    storageClass: string;
    size: string;
    md5Hash: string;
    contentEncoding: string;
    contentDisposition: string;
    crc32c: string;
    etag: string;
    downloadTokens: string;
  }

    const ref = this.storage.ref('Panel Materials/A Custom Report');
    ref.getDownloadURL().toPromise().then( url => {
      this.panelUrl = url;
     console.log(url);
    });
    ref.getMetadata().toPromise().then( data => {
      console.log(data.name);
    });
  }
  ngOnInit() {

    // first 4 reports to be added to the first column
    for (let i = 0; i < 4; i++) {
      this.firstTriReports.push(MONTHLY_REPORTS[i]);
    }
    for (let i = 4; i < 8; i++) {
      this.secTriReports.push(MONTHLY_REPORTS[i]);
    }
    for (let i = 8; i < 12; i++) {
      this.thirdTriReports.push(MONTHLY_REPORTS[i]);
    }
  }

}
