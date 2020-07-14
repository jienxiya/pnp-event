import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventModel, Participants } from '../service/event-model';
import { EventService } from '../service/event.service';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

// import { UserAccount } from "../service/event-model";
 
@Component({
    selector: 'app-events-list',
    templateUrl:'./events-list.component.html',
    styles: ['.body-content { font-size: 25px; }']
})

export class EventsListComponent implements OnInit, OnDestroy{
    
    // users: UserAccount[];
    // user: UserAccount;
    // isLogin = true;

    events: EventModel[];
    event: EventModel;
    isViewingList = true;
    getEventsSubscription: Subscription;

    constructor(private eventService: EventService, private router: Router) {}

    ngOnInit(){
    //this.events = this.eventService.getEvents();
      this.getEventsSubscription = this.eventService.getEvents().subscribe(events => {
        this.events = events;
        console.log("events: " , events);
        
      });
      this.eventService.currentUserAccount.subscribe(currentUser => {
        console.log('Current User: ', currentUser);
      });
    }

    ngOnDestroy(){
      this.getEventsSubscription.unsubscribe();
    }

    sendID(data: any){
      //console.log( 'Received: ' + data);
      this.events.map(event => {
        if(event.id === data) {
          this.event = event;
        }
        this.isViewingList = false;
      })
    }

    returnToListView() {
      this.isViewingList = true;
    }

    addNewParticipant(participant: Participants){
      this.events.map(event => {
        if(event.id === this.event.id) {
          event.participants.push(participant);
          this.eventService.updateEvent(event)
        }
      })
    }

    removeParticipant(par:any){
      // console.log("as: ", this.event.participants.indexOf(par));
      const id =  this.event.participants.indexOf(par)
      this.event.participants.splice(id)
      this.eventService.updateEvent(this.event)
      
      
    }

    addEvent(event:EventModel){
      this.eventService.addEvent(event);
      console.log(event)
    }

    deleteEvent(data:any){
      console.log("event: " , this.events.indexOf(data));
      this.eventService.deleteEvent(data)
    }

    logout(){
      this.eventService.updateCurrentUser({
        username:'',
        password:''
      });
      this.router.navigate(['/login']);
    }
}
