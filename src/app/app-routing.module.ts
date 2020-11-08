import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Dk/home/home.component';
import { ComplaintComponent } from './Dk/complaint/complaint.component';

const routes: Routes = [
{ path: '', component: HomeComponent, pathMatch: 'full' },
{ path: 'Complaint', component: ComplaintComponent, pathMatch: 'full' },
{ path: 'Dashboard', component: HomeComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
