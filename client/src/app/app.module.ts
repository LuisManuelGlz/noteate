import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { HomeModule } from './modules/home/home.module';
import { NotesModule } from './modules/notes/notes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    NotesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
