import {Component, OnInit} from '@angular/core';
import {CommitteeReport} from '../model/CommitteeReport';
import {AngularFireStorage} from '@angular/fire/storage';
import {PanelMaterials} from '../model/Panel-Materials';
import {ResourceService} from './resource.service';
import {MonthlyReport} from '../model/MonthlyReport';
import {PanelService} from '../panels/panel.service';
import {Panels} from '../model/Panels';
import {ResourceSubmissionService} from './resource-submission.service';
import {NgForm, FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ResourceSubmission} from '../model/ResourceSubmission';
import {$} from 'protractor';
import {Announcement} from '../model/Announcement';
import {Link} from '../model/Link';
import {LINKS} from '../model/Local-Links';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  localLinks: Link[] = null;
  facilities: Array<string> = [];
  announcements: Announcement[] = null;
  monthlyReports: MonthlyReport[] = null;
  committeeReports: Array<CommitteeReport> = [];
  panelMaterials: PanelMaterials[] = null;
  generalResources: PanelMaterials[] = null;
  financialArchive: MonthlyReport = new MonthlyReport();
  archiveReports: any[] = null;
  hasArchives: boolean;
  hasFinancialArchive: boolean;
  index = 0;
  livingSoberFlag: boolean;
  twelveTwelve: boolean;
  aaPaper: boolean;
  aaPocket: boolean;
  grapevine: boolean;
  laVina: boolean;
  newPacket: boolean;
  litRack: boolean;
  other: boolean;
  submitted: boolean = false;
  userForm: FormGroup;
  resourceSubmission: ResourceSubmission;
  madeSelection: boolean = false;

  sendDisabled: boolean = false;


  constructor(private storage: AngularFireStorage,
              private resourceService: ResourceService,
              private panelService: PanelService,
              private formBuilder: FormBuilder,
              private resourceSubmissionService: ResourceSubmissionService) {
  }

  ngOnInit() {
    this.localLinks = LINKS
    this.hasArchives = false;
    this.hasFinancialArchive = false;
    this.resourceSubmission = new ResourceSubmission();
    this.userForm = this.formBuilder.group({
      firstName: [],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^(1?-?[(]?(-?\\d{3})[)]?-?)?(\\d{3})(-?\\d{4})$')]],
      hiCommitments: ['', Validators.required],
      facility: ['', Validators.required],
      livingSober: [],
      twelveTwelve: [],
      aaPaper: [],
      aaPocket: [],
      grapevine: [],
      laVina: [],
      newPacket: [],
      litRack: [],
      other: [],
      comments: []
    });


    this.panelService.getCurrentPanels()
      .subscribe((data: Panels) => {
        data.feed.entry.forEach(ent => {
          this.facilities[this.index] = ent.gsx$facility.$t.toString();
          this.index++;
        });
        this.facilities = this.facilities.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
      });

    this.resourceService.getPanelMaterials().subscribe(data => {
      this.panelMaterials = data.map(e => {
        console.log('retrieved panel materials from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PanelMaterials;
      });
      this.panelMaterials.sort((a,b)=>a.order - b.order)
    });

    this.resourceService.getArchivedReports().subscribe(data => {
      this.archiveReports = data.map(e => {
        console.log('retrieved archives from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PanelMaterials;
      });
      if (this.archiveReports.length > 0) {
        this.hasArchives = true;
      } else {
        this.hasArchives = false;
      }
    });

    this.resourceService.getGeneralResources().subscribe(data => {
      this.generalResources = data.map(e => {
        console.log('retrieved general resources from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PanelMaterials;
      });
      this.generalResources.sort((a,b)=>a.order - b.order)
    });

    this.resourceService.getAnnouncements().subscribe(data => {
      this.announcements = data.map(e => {
        console.log('retrieved announcements from firestore');
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Announcement;
      });
    });

    this.resourceService.getMonthlyReports().subscribe(data => {
      this.monthlyReports = data.map(e => {
        console.log('retrieved monthly reports from firestore: ' + e.payload.doc.id);
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as MonthlyReport;
      });

      // sort reports by month
      this.monthlyReports.sort(function (a, b) {
        if (a.month < b.month) {
          return -1;
        }
        if (a.month > b.month) {
          return 1;
        }
        return 0;
      });

      for (let i = 0; i < this.monthlyReports.length; i++) {
        let containsReport: boolean = false;

        if (this.monthlyReports[i].isArchive) {
          this.hasFinancialArchive = true;
          this.financialArchive = this.monthlyReports[i];
          this.financialArchive.title = 'Previous Year Financial Summary';
          this.monthlyReports[i] = null;
          console.log('Archivable monthly report retrieved');
        }

        for (let j = 0; j < this.committeeReports.length; j++) {
          if (this.committeeReports[j].monthDate === this.getStringMonth(this.monthlyReports[i].month)) {
            containsReport = true;
            if (this.monthlyReports[i].title.endsWith('Minutes')) {
              this.committeeReports[j].minLink = this.monthlyReports[i].url;
              this.committeeReports[j].minutes = this.monthlyReports[i].title;
            } else if (this.monthlyReports[i].title.endsWith('Report')) {
              this.committeeReports[j].finLink = this.monthlyReports[i].url;
              this.committeeReports[j].financialReport = this.monthlyReports[i].title;
            }

          }
        }

        if (!containsReport) {
          let report = new CommitteeReport();
          this.committeeReports.push(report);
          report.monthDate = this.getStringMonth(this.monthlyReports[i].month);
          if (this.monthlyReports[i].title.endsWith('Minutes')) {
            report.minLink = this.monthlyReports[i].url;
            report.minutes = this.monthlyReports[i].title;
          } else if (this.monthlyReports[i].title.endsWith('Report')) {
            report.finLink = this.monthlyReports[i].url;
            report.financialReport = this.monthlyReports[i].title;
          }
        }
      }

    });


    this.livingSoberFlag = false;
    this.twelveTwelve = false;
    this.aaPaper = false;
    this.aaPocket = false;
    this.grapevine = false;
    this.laVina = false;
    this.newPacket = false;
    this.litRack = false;
    this.other = false;
  }

  showError(controlName: string) {
    if (this.userForm.get(controlName)) {
      return this.userForm.get(controlName).errors != null && this.submitted;
    }
    return false;

  }

  checkMadeSelection() {
    this.madeSelection = this.livingSoberFlag || this.twelveTwelve || this.aaPaper || this.aaPocket ||
      this.grapevine || this.laVina || this.newPacket || this.litRack || this.other;
  }

  onSubmit(form: NgForm) {
    console.log('initiate submission');
    this.submitted = true;
    this.checkMadeSelection();
    if (this.userForm.invalid || !this.madeSelection) {
      console.log('failed Submitting...');
      return;
    }

    this.resourceSubmission.email = this.userForm.controls.email.value;
    this.resourceSubmission.firstName = this.userForm.controls.firstName.value;
    this.resourceSubmission.lastName = this.userForm.controls.lastName.value;
    this.resourceSubmission.hiCommitments = this.userForm.controls.hiCommitments.value;
    this.resourceSubmission.facility = this.userForm.controls.facility.value;
    this.resourceSubmission.phone = this.userForm.controls.phone.value;
    this.resourceSubmission.livingSober = this.userForm.controls.livingSober.value;
    this.resourceSubmission.twelveTwelve = this.userForm.controls.twelveTwelve.value;
    this.resourceSubmission.aaPaper = this.userForm.controls.aaPaper.value;
    this.resourceSubmission.aaPocket = this.userForm.controls.aaPocket.value;
    this.resourceSubmission.grapevine = this.userForm.controls.grapevine.value;
    this.resourceSubmission.laVina = this.userForm.controls.laVina.value;
    this.resourceSubmission.newPacket = this.userForm.controls.newPacket.value;
    this.resourceSubmission.litRack = this.userForm.controls.litRack.value;
    this.resourceSubmission.other = this.userForm.controls.other.value;
    this.resourceSubmission.comments = this.userForm.controls.comments.value;

    console.log(this.resourceSubmission);
    this.sendDisabled = true;
    this.postResourceForm(form.value);
  }

  postResourceForm(form: NgForm) {
    console.log('resource: ' + this.resourceSubmission);
    this.resourceSubmissionService.postResourceForm(this.resourceSubmission)
      .subscribe(() => {
        this.sendDisabled = false;
        console.log('yay subscribe called');
        //display success

        //hide form
        document.getElementById('sub-container').classList.add('hidden');
        document.getElementById('thank-you-container').classList.add('show');
      });
  }

  getStringMonth(month: number): string {
    if (month === 1) {
      return 'January';
    } else if (month === 2) {
      return 'February';
    } else if (month === 3) {
      return 'March';
    } else if (month === 4) {
      return 'April';
    } else if (month === 5) {
      return 'May';
    } else if (month === 6) {
      return 'June';
    } else if (month === 7) {
      return 'July';
    } else if (month === 8) {
      return 'August';
    } else if (month === 9) {
      return 'September';
    } else if (month === 10) {
      return 'October';
    } else if (month === 11) {
      return 'November';
    } else if (month === 12) {
      return 'December';
    }
  }

  changeStatus(event: any) {

    if (event.currentTarget.id === 'livingSoberId') {
      if (!this.livingSoberFlag) {
        this.livingSoberFlag = true;
      } else {
        this.livingSoberFlag = false;
      }
    } else if (event.currentTarget.id === 'aaPaperId') {
      if (!this.aaPaper) {
        this.aaPaper = true;
      } else {
        this.aaPaper = false;
      }
    } else if (event.currentTarget.id === 'aaPocketId') {
      if (!this.aaPocket) {
        this.aaPocket = true;
      } else {
        this.aaPocket = false;
      }
    } else if (event.currentTarget.id === 'twelveId') {
      if (!this.twelveTwelve) {
        this.twelveTwelve = true;
      } else {
        this.twelveTwelve = false;
      }
    } else if (event.currentTarget.id === 'grapeId') {
      if (!this.grapevine) {
        this.grapevine = true;
      } else {
        this.grapevine = false;
      }
    } else if (event.currentTarget.id === 'laVinaId') {
      if (!this.laVina) {
        this.laVina = true;
      } else {
        this.laVina = false;
      }
    } else if (event.currentTarget.id === 'newId') {
      if (!this.newPacket) {
        this.newPacket = true;
      } else {
        this.newPacket = false;
      }
    } else if (event.currentTarget.id === 'litId') {
      if (!this.litRack) {
        this.litRack = true;
      } else {
        this.litRack = false;
      }
    } else if (event.currentTarget.id === 'otherId') {
      if (!this.other) {
        this.other = true;
      } else {
        this.other = false;
      }
    }
    this.checkMadeSelection();
  }

}

