import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { PanelsComponent } from './panels/panels.component';
import { ResourcesComponent } from './resources/resources.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { MatExpansionModule, MatTableModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './core/auth.guard';
import { UserService } from './core/user.service';
import { ContactService } from './contact/contact.service';
import { AuthService } from './core/auth.service';
import { UserResolver } from './user/user.resolver';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceService } from './resources/resource.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { OrientationComponent } from './orientation/orientation.component';
import { MainEventComponent } from './orientation/main-event/main-event.component';
import { EventsComponent } from './orientation/events/events.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DemoMaterialModule } from './admin/material-module';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/admin.service';
import { FacilitiesDBComponent } from './facilities-db/facilities-db.component';
import { PanelsDBComponent } from './panels-db/panels-db.component';
import {MembersDBComponent} from './members-db/members-db.component';
import {FacilitiesService} from './facilities-db/facilities-db.service';
import {MembersDbService} from './members-db/members-db.service';
import {PanelsDbService} from './panels-db/panels-db.service';

import { MemberInputComponent } from './shared/components/member-input/member-input.component';
import { MemberListComponent } from './shared/components/member-list/member-list.component';
import { PanelMemberListComponent } from './user/components/panel-member-list/panel-member-list.component';
import { AdminListComponent } from './user/components/admin-list/admin-list.component';
import { PanelDashboardComponent } from './user/components/panel-dashboard/panel-dashboard.component';
import { FacilitiesDashboardComponent } from './user/components/facilities-dashboard/facilities-dashboard.component';
import { PanelInputComponent } from './user/components/panel-input/panel-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    PanelsComponent,
    ResourcesComponent,
    ContactComponent,
    LoginComponent,
    EventsComponent,
    MainEventComponent,
    FooterComponent,
    UserComponent,
    RegisterComponent,
    ResourceListComponent,
    OrientationComponent,
    AdminListComponent,
    MainEventComponent,
    EventsComponent,
    AdminComponent,
    FacilitiesDBComponent,
    MembersDBComponent,
    PanelsDBComponent,
    MemberInputComponent,
    MemberListComponent,
    PanelMemberListComponent,
    PanelDashboardComponent,
    FacilitiesDashboardComponent,
    PanelInputComponent,
  ],
  imports: [
    AngularSvgIconModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatExpansionModule,
    NoopAnimationsModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ReactiveFormsModule,
    AngularFireStorageModule,
    NgbAlertModule,
    DragDropModule,
    DemoMaterialModule
  ],
  providers: [
    ContactService,
    AuthGuard,
    UserService,
    AuthService,
    UserResolver,
    ResourceService,
    AdminService,
    FacilitiesService,
    MembersDbService,
    PanelsDbService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
