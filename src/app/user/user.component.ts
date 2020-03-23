/* tslint:disable:no-trailing-whitespace */
import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
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
import {Announcement} from '../model/Announcement';
import {Contact} from '../model/Contact';
import {AdminMember} from '../model/AdminMember';

enum PageType {
  HOME_PAGE = 0,
  COMMITTEE_PAGE = 1
}

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})


export class UserComponent implements OnInit {

  // @ViewChild('alert', {static : true} )private alert: ElementRef;
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  @ViewChild('progressBar') progressBar: ElementRef;

  isHomeTabOpen = false;
  admin: AdminMember = new AdminMember();
  submitted = false;
  userForm: FormGroup;
  contact: Contact;
  currentPage: PageType;
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
  annoucementTitle: string;
  annoucementBody: string;
  resources: any = [
    'Panel Material',
    'General Resource',
    'Monthly Report',
    'Announcement',
    'Archived Report'
  ];
  reports: any = [
    'Financial Report',
    'Committee Minutes'
  ];
  archives: any = [
    'Create Archivable Record'
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
  announcement: Announcement = new Announcement();
  resourceMessage: string;
  fileErrorMessage: string;
  titleMessage: string;
  monthMessage: string;
  reportTypeMessage: string;
  resourceAlert: boolean;
  uploadAlert: boolean;
  reportTypeAlert: boolean;
  monthAlert: boolean;
  titleAlert: boolean;
  announcementTitleAlert: boolean;
  announcementBodyAlert: boolean;
  uploaded: boolean;
  isArchive: boolean;


  // panelMaterials: Array<Resource> = PANEL_MATERIALS;
  generalResources: Array<Resource> = GENERAL_RESOURCES;
  inputTitle: any;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage,
    private resourceService: ResourceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
    this.resourceAlert = false;
    this.uploadAlert = false;
    this.reportTypeAlert = false;
    this.monthAlert = false;
    this.titleAlert = false;
    this.uploaded = false;
    this.isArchive = false;

    this.currentPage = 0;

    setTimeout(() => this.resourceAlert = false, 10000);
    setTimeout(() => this.uploadAlert = false, 10000);
    setTimeout(() => this.reportTypeAlert = false, 10000);
    setTimeout(() => this.monthAlert = false, 10000);
    setTimeout(() => this.titleAlert = false, 10000);

  }
  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });

    this.contact = new Contact();

    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$')]],
      commitments: ['',[Validators.required]]
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

  validateForm(): boolean {
    if (this.resource == null) {
      this.resourceAlert = true;
      this.resourceMessage = 'Please select a resource type';
      console.log('Invalid form-- no resource');
      return false;
    }
    if (this.resource === 'Panel Material' || this.resource === 'General Resource' || this.resource === 'Archived Report') {
      if (this.title == null || this.title === '') {
        this.titleAlert = true;
        this.titleMessage = 'Please enter a document title';
      }
      if ((!this.uploaded && this.title != null) || (!this.uploaded && this.title === '')) {
        this.uploadAlert = true;
        this.fileErrorMessage = 'Please choose a file to upload';
        console.log('Invalid form-- no file chosen to upload');
        return false;
      }
    }
    if (this.resource === 'Monthly Report') {
      if (this.report == null) {
        this.reportTypeAlert = true;
        this.reportTypeMessage = 'Choose a report type';
      }
      if (this.basePath == null) {
        this.monthAlert = true;
        this.monthMessage = 'Choose a month';
      }
      if (this.report != null && this.basePath != null && !this.uploaded) {
        this.uploadAlert = true;
        this.fileErrorMessage = 'Please choose a file to upload';
        console.log('Invalid form-- no file chosen to upload');
        return false;
      }
    }
    if (this.resource === 'Anouncement') {
      console.log('Validating the announcement');
    }
      return true;
  }

  onSubmit(event) {
    // const id = Math.random().toString(36).substring(2);
    console.log('On Submit! Resource is ' + this.resource.toString());
    if (this.validateForm()) {
      if (this.resource.toString() === this.resources[0]) {
        this.ref = this.afStorage.ref('/Panel Materials/' + this.title.toString());
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task.snapshotChanges().pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe(url => {
              this.uploaded = false;
              this.panelMaterial.title = this.title.toString();
              this.panelMaterial.url = url;
              this.createPanelMaterial(this.panelMaterial);
              this.clearForm();
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
              this.uploaded = false;
              this.panelMaterial.title = this.title.toString();
              this.panelMaterial.url = url;
              this.createGeneralResource(this.panelMaterial);
              this.clearForm();
            });
          })
        ).subscribe();
      } else if (this.resource.toString() === this.resources[2]) {
        const year = new Date().getFullYear().toString();
        console.log(this.basePath.toString() + ' and ' + this.report.toString());
        this.title = this.report;
        this.ref = this.afStorage.ref('/Monthly Reports/' + this.title.toString());
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task.snapshotChanges().pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe(url => {
              this.uploaded = false;
              this.monthlyReport.title = this.title.toString();
              this.monthlyReport.url = url;
              this.monthlyReport.month = this.getMonth(this.basePath);
              this.monthlyReport.type = this.report;
              this.monthlyReport.timestamp = new Date().getTime();
              this.monthlyReport.isArchive = this.isArchive;
              this.createMonthlyReport(this.monthlyReport);
              this.clearForm();
            });
          })
        ).subscribe();
      } else if (this.resource.toString() === this.resources[3]) {
        console.log(this.annoucementTitle);
        console.log(this.annoucementBody);
        this.announcement.title = this.annoucementTitle.toString();
        this.announcement.body = this.annoucementBody.toString().substring(0, 256);
        this.announcement.fullBody = this.annoucementBody.toString();
        this.announcement.date = new Date().toDateString();
        this.announcement.isExpanded = false;
        console.log(this.announcement.date.toString());
        this.createAnnouncement(this.announcement);
        this.clearForm();
      } else if (this.resource.toString() === this.resources[4]) {
        console.log('Submitting archvived report ' + this.title.toString());
        this.ref = this.afStorage.ref('/Archived Reports/' + this.title.toString());
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task.snapshotChanges().pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe(url => {
              this.uploaded = false;
              this.panelMaterial.title = this.title.toString();
              this.panelMaterial.url = url;
              this.createArchiveReport(this.panelMaterial);
              this.clearForm();
            });
          })
        ).subscribe();
      }
    } else {
      // invalid form, do not submit.
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

  createAnnouncement(announcement: Announcement) {
    this.resourceService.createAnnouncement(announcement)
      .then(res => {
       // update UI
    });
  }

  createArchiveReport(resource: PanelMaterials) {
    this.resourceService.createArchiveReport(resource)
      .then(res => {
        // update UI
      });
  }

  addAdminMember(admin: AdminMember) {
    this.resourceService.addAdminMember(admin)
      .then(res => {
        // update UI
      });
  }

  onFileChange(event) {
    this.fileData = event.target.files[0];
    this.name = this.fileData.name;
    this.uploaded = true;
  }

  monthChangeHandler(event: any) {
    this.basePath = event.target.value;
    this.monthAlert = false;
  }

  archiveChangeHandler(event: any) {
    this.isArchive = !this.isArchive;
    console.log('Archive status ' + this.isArchive);
  }

  resourceChangeHandler(event: any) {
    console.log('Resource changed to: ' + event.target.value);
    this.resource = event.target.value;
    this.resourceAlert = false;
  }

  reportChangeHandler(event: any) {
    this.report = event.target.value;
    this.reportTypeAlert = false;
  }

  titleChangeHandler(event: any) {
    this.title = event.target.value;
    this.titleAlert = false;
  }

  announcementTitleChangeHandler(event: any) {
    this.annoucementTitle = event.target.value;
    this.announcementTitleAlert = false;
  }

  announcementTextBodyChangeHandler(event: any) {
    console.log(event.target.value);
    this.annoucementBody = this.announcementTextBodyNewLineFormatter(event.target.value);
    this.announcementBodyAlert = false;
  }

  announcementTextBodyNewLineFormatter(body: string): string {
    return body.replace(/\n\r?/g, '<br/>');
  }

  clearForm() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.name = '';
    this.title = '';
    this.annoucementTitle = '';
    this.annoucementBody = '';
    this.uploadProgress = new Observable<number>();
  }

  viewCommitteePage() {
    this.currentPage = 1;
  }

  viewHomePage() {
    this.currentPage = 0;
  }
  invalidFirstName() {
    return (this.submitted && this.userForm.controls.first_name.errors != null);
  }

  invalidLastName() {
    return (this.submitted && this.userForm.controls.last_name.errors != null);
  }

  invalidEmail() {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }

  invalidPhone() {
    return (this.submitted && this.userForm.controls.phone.errors != null);
  }

  firstNameChangeHandler(event: any) {
    this.admin.firstName = event.target.value;
  }

  lastNameChangeHandler(event: any) {
    this.admin.lastName = event.target.value;
  }

  emailChangeHandler(event: any) {
    this.admin.email = event.target.value;
  }

  phoneChangeHandler(event: any) {
    this.admin.phone = event.target.value;
  }

  commitmentChangeHandler(event: any) {
    this.admin.commitment = event.target.value;
  }

  onAdminEntry(form: NgForm) {
    this.addAdminMember(this.admin);
  }

  homeTabClicked() {
    this.isHomeTabOpen = !this.isHomeTabOpen;
  }
}


