import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import {HttpClient} from '@angular/common/http';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable, Subscription} from 'rxjs';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';
import {finalize} from 'rxjs/operators';
import {PanelMaterials} from '../model/Panel-Materials';
import {ResourceService} from '../resources/resource.service';
import {MonthlyReport} from '../model/MonthlyReport';


@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  fileData: File = null;
  public name: any = 'Choose file';
  public str: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  basePath: string;
  resource: string;
  report: string;
  title: string;
  resources: any = [
    'Panel Material',
    'General Resource',
    'Monthly Report'
  ];
  reports: any = [
    'Financial Report',
    'Committee Minutes'
  ];
  months: any = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  uploadProgress: Observable<number>;
  uploadState: Subscription;
  panelMaterial: PanelMaterials = new PanelMaterials();
  monthlyReport: MonthlyReport = new MonthlyReport();
  statusMessage: string;

  // panelMaterials: Array<Resource> = PANEL_MATERIALS;
  generalResources: Array<Resource> = GENERAL_RESOURCES;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }

  validateForm(): boolean{
    if (this.panelMaterial )
    if (this.title == null) {
      this.statusMessage = 'Please add a title to your document.';
      return false;
    } else if (this.getMonth == null) {
      this.statusMessage = 'Please select a month for your report.';
      return false;
    } else if (this.report == null) {
      this.statusMessage = 'Please select report type to upload.';
      return false;
    } else if (this.basePath == null) {
      this.statusMessage = 'Please select the month for when your report is.';
      return false;
    }
      return true;
  }

  onSubmit(event) {
    // start form validations
    this.validateForm();
    // const id = Math.random().toString(36).substring(2);
    if (this.validateForm()) {
      if (this.resource.toString() === this.resources[0]) {
        this.ref = this.afStorage.ref('/Panel Materials/' + this.title.toString());
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task.snapshotChanges().pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe(url => {
              this.panelMaterial.title = this.title.toString();
              this.panelMaterial.url = url;
              this.createPanelMaterial(this.panelMaterial);
            });
          })
        ).subscribe();
      } else if (this.resource.toString() === this.resources[1]) {
        this.ref = this.afStorage.ref('/General Resources/' + this.title.toString());
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task.snapshotChanges().pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe(url => {
              this.panelMaterial.title = this.title.toString();
              this.panelMaterial.url = url;
              this.createGeneralResource(this.panelMaterial);
            });
          })
        ).subscribe();
      } else {
        const year = new Date().getFullYear().toString();
        this.title = this.basePath + '_' + this.report;
        this.ref = this.afStorage.ref('/Monthly Reports/' + this.title.toString());
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task.snapshotChanges().pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe(url => {
              this.monthlyReport.title = this.title.toString();
              this.monthlyReport.url = url;
              this.monthlyReport.month = this.getMonth(this.basePath);
              this.monthlyReport.type = this.report;
              this.monthlyReport.timestamp = new Date().getTime();
              this.createMonthlyReport(this.monthlyReport);
            });
          })
        ).subscribe();
      }
    } else {
      //invalid form, do not submit.
    }
  }

  getMonth(month: string): number {
    if (month === 'January') {
      return 1;
    } else if (month === 'February') {
      return 2;
    } else if (month === 'March') {
      return 3;
    } else if (month === 'April') {
      return 4;
    } else if (month === 'May') {
      return 5;
    } else if (month === 'June') {
      return 6;
    } else if (month === 'July') {
      return 7;
    } else if (month === 'August') {
      return 8;
    } else if (month === 'September') {
      return 9;
    } else if (month === 'October') {
      return 10;
    } else if (month === 'November') {
      return 11;
    } else if (month === 'December') {
      return 12;
    }

  }
  createPanelMaterial(resource: PanelMaterials) {
    this.resourceService.createPanelMaterial(resource)
      .then(res => {
        // update UI
      });
  }

  createGeneralResource(resource: PanelMaterials) {
    this.resourceService.createGeneralResource(resource)
      .then(res => {
        // update UI
      });
  }

  createMonthlyReport(report: MonthlyReport) {
    this.resourceService.createMonthlyReport(report)
      .then(res => {
        // update UI
      });
  }

  onFileChange(event) {
    this.fileData = event.target.files[0];
    this.name = this.fileData.name;
  }

  monthChangeHandler(event: any) {
    this.basePath = event.target.value;
  }

  resourceChangeHandler(event: any) {
    this.resource = event.target.value;
  }

  reportChangeHandler(event: any) {
    this.report = event.target.value;
  }

  titleChangeHandler(event: any) {
    this.title = event.target.value;
  }
}


