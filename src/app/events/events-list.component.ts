import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventModel, Participants } from '../service/event-model';
import { EventService } from '../service/event.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
 
@Component({
    selector: 'app-events-list',
    templateUrl:'./events-list.component.html',
    styleUrls: ['./events-list.component.css']
})

export class EventsListComponent implements OnInit, OnDestroy{

    events: EventModel[];
    event: EventModel;
    isViewingList = true;
    getEventsSubscription: Subscription;

    constructor(private eventService: EventService, private router: Router) {}

    ngOnInit(){
      this.getEventsSubscription = this.eventService.getEvents().subscribe(events => {
        this.events = events;
      });
    }

    ngOnDestroy(){
      this.getEventsSubscription.unsubscribe();
    }

    addEvent(event:EventModel){
      this.eventService.addEvent(event);
    }

    deleteEvent(data:any){
      this.eventService.deleteEvent(data)
    }

    logout(){
      this.eventService.updateCurrentUser({
        username:'',
        password:''
      });
      this.router.navigate(['/login']);
    }

    viewEvent(event: EventModel){
      this.router.navigate(['/events', event.id]);  
    }
}
