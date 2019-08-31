import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import {HttpClient} from '@angular/common/http';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';

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
  resources: any = [
    'Panel Material',
    'General Resource'
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


  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private afStorage: AngularFireStorage
  ) {

  }

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

  setReportMonth() {
  }

  onSubmit(event) {
    console.log('Submitted ' +  this.resource.toString() + ' file for ' + this.basePath.toString());
    // this.basePath =
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.child(this.resource.toString() + ' ' + this.basePath.toString()).put(this.fileData);
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log(this.fileData.name);
    this.name = this.fileData.name;
  }

  onFileChange(event) {
    this.fileData = event.target.files[0];
    this.name = this.fileData.name;
    // const id = Math.random().toString(36).substring(2);
    // this.ref = this.afStorage.ref(id);
    // this.task = this.ref.child(`${this.basePath}/${upload.file.name}`).put(this.fileData);
  }

  // upload(event) {
  //   const id = Math.random().toString(36).substring(2);
  //   this.ref = this.afStorage.ref(id);
  //   this.task = this.ref.put(event.target.files[0]);
  // }

  monthChangeHandler(event: any) {
    this.basePath = event.target.value;
  }

  resourceChangeHandler(event: any) {
    this.resource = event.target.value;
  }
}


