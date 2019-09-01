import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import {HttpClient} from '@angular/common/http';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {GENERAL_RESOURCES} from '../model/General-Resources';
import {Resource} from '../model/Resource';
import {finalize} from 'rxjs/operators';


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
  downloadUrl: any;
  uploadState: Subscription;

  // panelMaterials: Array<Resource> = PANEL_MATERIALS;
  generalResources: Array<Resource> = GENERAL_RESOURCES;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage
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

  onSubmit(event) {
    // const id = Math.random().toString(36).substring(2);
    if (this.resource.toString() === this.resources[0]) {
      console.log('Panel Material selected');
      this.ref = this.afStorage.ref('/Panel Materials');
      this.task = this.ref.child(this.title.toString()).put(this.fileData);
      // this.uploadProgress = this.task.percentageChanges();
      this.uploadState = this.task.snapshotChanges().pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            console.log(url); // <-- do what ever you want with the url..
          });
        })
      ).subscribe();
    } else if (this.resource.toString() === this.resources[1]) {
      console.log('General Resource selected');
      this.ref = this.afStorage.ref('/General Resources');
      this.task = this.ref.child(this.title.toString()).put(this.fileData);
      this.uploadProgress = this.task.percentageChanges();
    } else {
      console.log('Monthly report selected');
      this.ref = this.afStorage.ref('/Monthly Reports');
      this.task = this.ref.child(this.resource.toString() + ' ' + this.basePath.toString()).put(this.fileData);
      this.uploadProgress = this.task.percentageChanges();
    }
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


