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
import { AuthGuard } from "../auth.guard";
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { EditDialogComponent } from "./components/edit-dialog/edit-dialog.component";
import { SearchComponent } from "./components/search/search.component";
import { ImageDialogComponent } from "./components/image-dialog/image-dialog.component";
import { LabelsComponent } from './components/labels/labels.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { QuestionComponent } from "./components/question/question.component";
import { ProductComponent } from './components/product/product.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

const routes: Routes = [
  {
    
    path: 'login', component: LoginComponent
  },
  {
    path: 'product', component: ProductComponent  
  },
  {
    path: 'product-dialog', component: ProductDialogComponent
  },
  {
    path: 'signup', component: RegisterComponent
  },
  {
    path: 'forgot', component: ForgotComponent
  },
  {
    path: 'resetpassword/:token', component: ResetComponent
  },
  {
    path: '', component: DashboardComponent, canActivate:[AuthGuard],
     children:[
      {path: '', component: NotesComponent},
      {path: 'reminder', component: ReminderComponent},
      {path: 'archive', component: ArchiveComponent},
      {path: 'trash', component: TrashComponent},
      {path: 'search', component: SearchComponent},
      {path: 'image-card', component: ImageDialogComponent},
      {path: 'label/:labelname', component: LabelsComponent},
      {path: 'QuestionAnswer/:id', component: QuestionComponent},
      {
        path: 'dialog', component: DialogComponent
      },
      {
        path: 'editDialog' , component: EditDialogComponent
      },
      {
        path: 'collab' , component: CollaboratorComponent
      },
      {
        path: 'takeNotes', component: TakeNotesComponent
      },
      {
        path: 'icon-list', component: IconListComponent
      },
      {
        path: 'display-cards', component: DisplayNotesComponent
      }
    ]
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
