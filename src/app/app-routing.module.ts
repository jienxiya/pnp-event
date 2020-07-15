import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../app/login/login.component";
import { EventsListComponent } from "../app/events/events-list.component";
// import { RegisterComponent } from "../app/register/register.component";
import { EventsRouteActivator } from "./events/event-route-activator.service";
import { EventDetailsComponent } from "../app/events/event-details/event-details.component";

const routes: Routes = [
  // { path: 'register', component: RegisterComponent, pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'events', component: EventsListComponent, canActivate: [EventsRouteActivator] },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventsRouteActivator] },
  { path: '', redirectTo: '/login', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
