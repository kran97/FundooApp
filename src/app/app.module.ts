import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserServicesService } from "./services/user-services.service";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from "@angular/material";
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { TakeNotesComponent } from './components/take-notes/take-notes.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { NoteServiceService } from "./services/notes-services/note-service.service";
import {TextFieldModule} from '@angular/cdk/text-field';
import { DisplayNotesComponent } from './components/display-notes/display-notes.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { IconTrashComponent } from './components/icon-trash/icon-trash.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { DataServiceService } from "./services/data-service.service";
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { SearchComponent } from './components/search/search.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { LabelsComponent } from './components/labels/labels.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [

    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent,
    DashboardComponent,
    DialogComponent,
    TakeNotesComponent,
    IconListComponent,
    DisplayNotesComponent,
    NotesComponent,
    ReminderComponent,
    ArchiveComponent,
    TrashComponent,
    IconTrashComponent,
    EditDialogComponent,
    SearchPipePipe,
    SearchComponent,
    ImageDialogComponent,
    LabelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    TextFieldModule,
    MatGridListModule,
    MatTooltipModule,
    ImageCropperModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  providers: [
    UserServicesService,
    NoteServiceService,
    DataServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
