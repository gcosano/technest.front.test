import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@technest/security';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'accounts',
    pathMatch: 'full'
  },
  {
    path: 'accounts',
    canActivate: [AuthGuard],
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
