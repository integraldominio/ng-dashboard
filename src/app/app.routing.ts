import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'sigin', component: SigninComponent },
  { path: 'sigup', component: SignupComponent },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'apps/navigation', loadChildren: './navigation/navigation.module#NavigationModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormModule' }
    ]
  },
  { path: '**', redirectTo: '/sigin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
