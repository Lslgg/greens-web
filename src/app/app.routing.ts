import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'login',loadChildren: './login/login.module#LoginModule' },
  { path: 'home',loadChildren: './home/home.module#HomeModule' },  
  { path: 'admin',loadChildren: './admin/admin.module#AdminModule' },  
  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }