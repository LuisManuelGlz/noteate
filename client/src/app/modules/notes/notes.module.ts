import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { SaveNoteFormComponent } from './components/save-note-form/save-note-form.component';


@NgModule({
  declarations: [DashboardComponent, NotesListComponent, SaveNoteFormComponent],
  imports: [
    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
