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
    'Business Committee'
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

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
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
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    if (this.resource.toString() === this.resources[0]) {
      console.log('Panel Material selected');
      // Monthly reports and current month should be disabled
      this.task = this.ref.child(this.title.toString()).put(this.fileData);
      this.uploadProgress = this.task.percentageChanges();
      console.log(this.uploadProgress);
    } else if (this.resource.toString() === this.resources[1]) {
      console.log('General Resource selected');
      // Monthly reports and current month should be disabled
      this.task = this.ref.child(this.title.toString()).put(this.fileData);
      this.uploadProgress = this.task.percentageChanges();
    } else {
      console.log('Monthly report selected');
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
    if (this.resource === this.resources[0]) {
    }
  }

  reportChangeHandler(event: any) {
    this.report = event.target.value;
  }

  titleChangeHandler(event: any) {
    this.title = event.target.value;
  }

  isDisabled(event: any) {
    console.log(event.toString());
  }
}


