import { BrowserModule } from '@angular/platform-browser';
import { ChangeDetectorRef, NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';
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

import { MemberInputComponent } from './shared/components/member-input/member-input.component';
import { MemberListComponent } from './shared/components/member-list/member-list.component';
import { PanelMemberListComponent } from './user/components/panel-member-list/panel-member-list.component';
import { AdminListComponent } from './user/components/admin-list/admin-list.component';
import { PanelDashboardComponent } from './user/components/panel-dashboard/panel-dashboard.component';
import { FacilitiesDashboardComponent } from './user/components/facilities-dashboard/facilities-dashboard.component';
import { PanelInputComponent } from './user/components/panel-input/panel-input.component';
import { MemberDialogComponent } from './shared/components/member-dialog/member-dialog.component';
import { PanelListComponent } from './shared/components/panel-list/panel-list.component';
import { PanelDialogComponent } from './shared/components/panel-dialog/panel-dialog.component';
import { FacilityDialogComponent } from './shared/components/facility-dialog/facility-dialog.component';
import { FacilityListComponent } from './shared/components/facility-list/facility-list.component';
import { FacilityInputComponent } from './shared/components/facility-input/facility-input.component';
import { SortPanelMembersByFirstNamePipe } from './sort-panel-members-by-first-name.pipe';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SortPanelMembersByLastNamePipe } from './sort-panel-members-by-last-name.pipe';
import { SortPanelMembersByEmailPipe } from './sort-panel-members-by-email.pipe';
import { SortByPipe } from './sort-by.pipe';
import * as XLSX from 'xlsx';
import { FilterByPipe } from './filter-by.pipe';
import { FilterComponent } from './shared/components/filter/filter.component';
import { VolunteerComponent } from './shared/components/volunteer/volunteer.component';
import { PendingDashboardComponent } from './user/components/pending-dashboard/pending-dashboard.component';
import { EmailPipe } from './email.pipe'

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
    MemberInputComponent,
    MemberListComponent,
    PanelMemberListComponent,
    PanelDashboardComponent,
    FacilitiesDashboardComponent,
    PanelInputComponent,
    MemberDialogComponent,
    PanelListComponent,
    PanelDialogComponent,
    FacilityDialogComponent,
    FacilityListComponent,
    FacilityInputComponent,
    SortPanelMembersByFirstNamePipe,
    SortPanelMembersByLastNamePipe,
    SortPanelMembersByEmailPipe,
    SortByPipe,
    FilterByPipe,
    FilterComponent,
    VolunteerComponent,
    PendingDashboardComponent,
    EmailPipe,

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
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatCheckboxModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireStorageModule,
    NgbAlertModule,
    DragDropModule,
  ],
  providers: [
    [AsyncPipe, ChangeDetectorRef as Provider],
    ContactService,
    AuthGuard,
    UserService,
    AuthService,
    UserResolver,
    ResourceService,
    SortPanelMembersByFirstNamePipe,
    SortPanelMembersByLastNamePipe,
    SortPanelMembersByEmailPipe,
    SortByPipe,
    FilterByPipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MemberDialogComponent,
    MemberDialogComponent,
    PanelDialogComponent,
    FacilityDialogComponent,
  ],
})
export class AppModule {}
