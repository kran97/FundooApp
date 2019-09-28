import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotComponent } from "./components/forgot/forgot.component";
import { ResetComponent } from "./components/reset/reset.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forgot', component: ForgotComponent
  },
  {
    path: 'reset', component: ResetComponent
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
