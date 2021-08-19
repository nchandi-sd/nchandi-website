import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { OnDestroy } from '@angular/core';

import { PanelMaterials } from '../model/Panel-Materials';
import { ResourceService } from '../resources/resource.service';
import { MonthlyReport } from '../model/MonthlyReport';
import { Announcement } from '../model/Announcement';
import { AdminMember } from '../model/AdminMember';
import { PanelMemberService } from '../shared/services/panel-member.service';
import { AdminService } from '../shared/services/admin.service';

enum PageType {
  HomePage = 1,
  CommitteePage = 2,
  PanelMemberPage = 3,
  PanelsPage = 4,
  FacilitiesPage = 5,
}

const MONTHS = [
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
  'December',
];

const RESOURCES = [
  'Panel Material',
  'General Resource',
  'Monthly Report',
  'Announcement',
  'Archived Report',
];

const REPORTS = ['Financial Report', 'Committee Minutes'];
const ARCHIVES = ['Create Archivable Record'];

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChildren('checkboxes')
  checkboxes: QueryList<ElementRef>;

  @ViewChild('progressBar')
  progressBar: ElementRef;

  resources = RESOURCES;
  reports = REPORTS;
  archives = ARCHIVES;
  months = MONTHS;
  name: any = 'Choose file';
  basePath: string;
  resource: string;
  title: string;
  annoucementTitle: string;
  annoucementBody: string;
  uploadProgress: Observable<number>;
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
  currentPage$ = new BehaviorSubject<number>(PageType.HomePage);

  private subscription = new Subscription();
  private ref: AngularFireStorageReference;
  private task: AngularFireUploadTask;
  private fileData: File = null;
  private report: string;
  private announcementTitleAlert: boolean;
  private announcementBodyAlert: boolean;
  private uploaded: boolean;
  private isArchive: boolean;
  private uploadState: Subscription;
  private panelMaterial: PanelMaterials = new PanelMaterials();
  private monthlyReport: MonthlyReport = new MonthlyReport();
  private announcement: Announcement = new Announcement();

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private panelMemberService: PanelMemberService,
    private adminMemberService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private afStorage: AngularFireStorage,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    this.resourceAlert = false;
    this.uploadAlert = false;
    this.reportTypeAlert = false;
    this.monthAlert = false;
    this.titleAlert = false;
    this.uploaded = false;
    this.isArchive = false;

    setTimeout(() => (this.resourceAlert = false), 10000);
    setTimeout(() => (this.uploadAlert = false), 10000);
    setTimeout(() => (this.reportTypeAlert = false), 10000);
    setTimeout(() => (this.monthAlert = false), 10000);
    setTimeout(() => (this.titleAlert = false), 10000);

    const pageId$ = this.route.params.pipe(map((params) => params.id));

    this.subscription.add(
      pageId$.subscribe((pageId) => {
        if (!pageId) {
          pageId = PageType.HomePage;
        }
        this.currentPage$.next(pageId);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.doLogout().then(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Logout error', error);
      }
    );
  }

  onSubmit(event) {
    // const id = Math.random().toString(36).substring(2);
    console.log('On Submit! Resource is ' + this.resource.toString());
    if (this.validateForm()) {
      if (this.resource.toString() === this.resources[0]) {
        this.ref = this.afStorage.ref(
          '/Panel Materials/' + this.title.toString()
        );
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.ref.getDownloadURL().subscribe((url) => {
                this.uploaded = false;
                this.panelMaterial.title = this.title.toString();
                this.panelMaterial.url = url;
                this.panelMaterial.order = -1;
                this.createPanelMaterial(this.panelMaterial);
                this.clearForm();
              });
            })
          )
          .subscribe();
      } else if (this.resource.toString() === this.resources[1]) {
        this.ref = this.afStorage.ref(
          '/General Resources/' + this.title.toString()
        );
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.ref.getDownloadURL().subscribe((url) => {
                this.uploaded = false;
                this.panelMaterial.title = this.title.toString();
                this.panelMaterial.url = url;
                this.panelMaterial.order = -1;
                this.createGeneralResource(this.panelMaterial);
                this.clearForm();
              });
            })
          )
          .subscribe();
      } else if (this.resource.toString() === this.resources[2]) {
        const year = new Date().getFullYear().toString();
        console.log(
          this.basePath.toString() + ' and ' + this.report.toString()
        );
        this.title = this.basePath + '_' + this.report;
        this.ref = this.afStorage.ref(
          '/Monthly Reports/' + this.title.toString()
        );
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.ref.getDownloadURL().subscribe((url) => {
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
          )
          .subscribe();
      } else if (this.resource.toString() === this.resources[3]) {
        console.log(this.annoucementTitle);
        console.log(this.annoucementBody);
        this.announcement.title = this.annoucementTitle.toString();
        this.announcement.body = this.annoucementBody
          .toString()
          .substring(0, 256);
        this.announcement.fullBody = this.annoucementBody.toString();
        this.announcement.date = new Date().toDateString();
        this.announcement.isExpanded = false;
        console.log(this.announcement.date.toString());
        this.createAnnouncement(this.announcement);
        this.clearForm();
      } else if (this.resource.toString() === this.resources[4]) {
        console.log('Submitting archvived report ' + this.title.toString());
        this.ref = this.afStorage.ref(
          '/Archived Reports/' + this.title.toString()
        );
        this.task = this.ref.put(this.fileData);
        this.uploadProgress = this.task.percentageChanges();
        this.uploadState = this.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.ref.getDownloadURL().subscribe((url) => {
                this.uploaded = false;
                this.panelMaterial.title = this.title.toString();
                this.panelMaterial.url = url;
                this.createArchiveReport(this.panelMaterial);
                this.clearForm();
              });
            })
          )
          .subscribe();
      }
    } else {
      // invalid form, do not submit.
    }
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
    this.annoucementBody = this.announcementTextBodyNewLineFormatter(
      event.target.value
    );
    this.announcementBodyAlert = false;
  }

  viewCommitteePage() {
    this.router.navigate(['/user', PageType.CommitteePage]);
  }

  viewHomePage() {
    this.router.navigate(['/user', PageType.HomePage]);
  }

  viewPanelMembersPage() {
    this.router.navigate(['/user', PageType.PanelMemberPage]);
  }

  viewPanelsPage() {
    this.router.navigate(['/user', PageType.PanelsPage]);
  }

  viewFacilitiesPage() {
    this.router.navigate(['/user', PageType.FacilitiesPage]);
  }

  onAdminEntry(member: AdminMember) {
    this.addAdminMember(member);
  }

  onPanelMemberAdd(member: AdminMember) {
    this.addPanelMember(member);
  }

  private announcementTextBodyNewLineFormatter(body: string): string {
    return body.replace(/\n\r?/g, '<br/>');
  }

  private clearForm() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.name = '';
    this.title = '';
    this.annoucementTitle = '';
    this.annoucementBody = '';
    this.uploadProgress = of(0);
  }

  private validateForm(): boolean {
    if (this.resource == null) {
      this.resourceAlert = true;
      this.resourceMessage = 'Please select a resource type';
      console.log('Invalid form-- no resource');
      return false;
    }
    if (
      this.resource === 'Panel Material' ||
      this.resource === 'General Resource' ||
      this.resource === 'Archived Report'
    ) {
      if (this.title == null || this.title === '') {
        this.titleAlert = true;
        this.titleMessage = 'Please enter a document title';
      }
      if (
        (!this.uploaded && this.title != null) ||
        (!this.uploaded && this.title === '')
      ) {
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

  private getMonth(month: string): number {
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

  private async createPanelMaterial(resource: PanelMaterials) {
    await this.resourceService.createPanelMaterial(resource);
  }

  private async createGeneralResource(resource: PanelMaterials) {
    await this.resourceService.createGeneralResource(resource);
  }

  private async createMonthlyReport(report: MonthlyReport) {
    await this.resourceService.createMonthlyReport(report);
  }

  private async createAnnouncement(announcement: Announcement) {
    await this.resourceService.createAnnouncement(announcement);
  }

  private async createArchiveReport(resource: PanelMaterials) {
    await this.resourceService.createArchiveReport(resource);
  }

  private addAdminMember(admin: AdminMember) {
    this.subscription.add(
      this.adminMemberService.addAdminMember(admin).subscribe()
    );
  }

  private addPanelMember(admin: AdminMember) {
    this.subscription.add(
      this.panelMemberService.addPanelMember(admin).subscribe()
    );
  }
}
