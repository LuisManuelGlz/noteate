import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    SignUpComponent,
    SignUpFormComponent,
    SignInFormComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
