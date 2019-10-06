import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from "./components/forgot/forgot.component";
import { ResetComponent } from "./components/reset/reset.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { TakeNotesComponent } from "./components/take-notes/take-notes.component";
import { IconListComponent } from './components/icon-list/icon-list.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'signup', component: RegisterComponent
  },
  {
    path: 'forgot', component: ForgotComponent
  },
  {
    path: 'reset', component: ResetComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'dialog', component: DialogComponent
  },
  {
    path: 'takeNotes', component: TakeNotesComponent
  },
  {
    path: 'icon-list', component: IconListComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
