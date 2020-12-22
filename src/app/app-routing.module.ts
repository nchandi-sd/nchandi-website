import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent} from './about/about.component';
import { PanelsComponent} from './panels/panels.component';
import { ResourcesComponent} from './resources/resources.component';
import {ContactComponent} from './contact/contact.component';
import {LoginComponent} from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import {OrientationComponent} from './orientation/orientation.component';
import { AdminComponent } from './admin/admin.component';

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
    path: 'orientation',
    component: OrientationComponent
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
    component: LoginComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'user',
    component: UserComponent,
    resolve: {
      data: UserResolver
    }
  },
  {
    path: 'admin',
    component: AdminComponent
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
