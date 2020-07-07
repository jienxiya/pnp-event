import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../app/login/login.component";
import { EventsListComponent } from "../app/events/events-list.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'events', component: EventsListComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
