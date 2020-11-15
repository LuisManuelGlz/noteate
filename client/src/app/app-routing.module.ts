import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes as homeRoutes } from './modules/home/home-routing.module';
import { routes as notesRoutes } from './modules/notes/notes-routing.module';

const routes: Routes = [
  {
    path: '',
    children: [...homeRoutes],
  },
  {
    path: 'notes',
    children: [...notesRoutes],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
