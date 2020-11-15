import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
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
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {PanelService} from './panels/panel.service';
import { FooterComponent } from './footer/footer.component';
import {MatExpansionModule, MatTableModule} from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './core/auth.guard';
import {UserService} from './core/user.service';
import {ContactService} from './contact/contact.service';
import {AuthService} from './core/auth.service';
import {UserResolver} from './user/user.resolver';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ResourceListComponent } from './resource-list/resource-list.component';
import {ResourceService} from './resources/resource.service';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { OrientationComponent } from './orientation/orientation.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import {MainEventComponent} from './orientation/main-event/main-event.component';
import {EventsComponent} from './orientation/events/events.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DemoMaterialModule } from './admin/material-module';
import { TabGroupBasicExample } from './admin/tab-group-basic-example';


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
    TabGroupBasicExample
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
    PanelService,
    ContactService,
    AuthGuard,
    UserService,
    AuthService,
    UserResolver,
    ResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
