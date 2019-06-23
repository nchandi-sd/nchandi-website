import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent} from './about/about.component';
import { PanelsComponent} from './panels/panels.component';
import { ResourcesComponent} from './resources/resources.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'panels',
    component: PanelsComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
