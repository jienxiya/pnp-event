import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventModel, Participants } from '../service/event-model';
import { EventService } from '../service/event.service';
import { Subscription } from 'rxjs';
 
@Component({
    selector: 'app-events-list',
    templateUrl:'./events-list.component.html',
    styles: ['.body-content { font-size: 25px; }']
})

export class EventsListComponent implements OnInit, OnDestroy{
    // events = EVENTS;
    // event: any;
    events: EventModel[];
    event: EventModel;
    isViewingList = true;
    getEventsSubscription: Subscription;

    constructor(private eventService: EventService) {}

    ngOnInit(){
    //this.events = this.eventService.getEvents();
      this.getEventsSubscription = this.eventService.getEvents().subscribe(events => {
        this.events = events;
      })
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

    addEvent(event:EventModel){
      this.eventService.addEvent(event);
      console.log(event)
    }
}
export const EVENTS = [
    {
      id: 0,
      name: 'Be Angularized',
      category: 'Talks@PN',
      speaker: 'Juan dela Cruz',
      emcee: 'Nanit Katipunan',
      time: '10:00 AM',
      date: '05/02/2020',
      duration: 3,
      venue: {
        address: 'Carmelite Compound',
        building: 'Basketball court',
        room: ''
      },
      onlineUrl: '',
      participants: [
          {
              fullName: 'Jun Rey Ansing',
              position: 'Innovative Technology Trainer',
              company: 'Passerelles numeriques'
          },
          {
            fullName: 'Rene Abdallah',
            position: 'IT/Training Manager',
            company: 'Passerelles numeriques'
        },
        {
            fullName: 'Marine Le Mezo',
            position: 'IT Trainer/Volunteer',
            company: 'Passerelles numeriques'
        },
  ],
      description: 'This is all about opportunities with Angular '
    },
    {
      id: 1,
      name: 'Thank You Ate Jade',
      category: 'Despidida Event',
      speaker: '',
      emcee: 'Aeromel Laure',
      time: '1:00 PM',
      date: '12/21/2019',
      duration: 3,
      venue: {
        address: 'Carmelite Compound',
        building: 'Basketball court',
        room: ''
      },
      onlineUrl: '',
      participants: [
        {
            fullName: 'Marice Jade Chua',
            position: 'General Manager',
            company: 'Passerelles numeriques'
        },
        {
          fullName: 'Rene Abdallah',
          position: 'IT/Training Manager',
          company: 'Passerelles numeriques'
      },
      {
          fullName: 'Marine Le Mezo',
          position: 'IT Trainer/Volunteer',
          company: 'Passerelles numeriques'
      },
    ],
    description: 'This was a despideda for Ms. Jade Chua, PNP-GM'
    },
    {
      id: 2,
      name: 'Job Fair 2020',
      category: 'Job Fair',
      speaker: 'Orville Avila and others',
      emcee: 'Thessa Torre',
      time: '8:00 AM',
      date: '02/10/2020',
      duration: 4,
      venue: {
        address: 'USC Talamban',
        building: 'LRC Building',
        room: 'Audio-Visual Room'
      },
      onlineUrl: '',
      participants: [
        {
            fullName: 'Marie Maureen Salvaleon',
            position: 'Academic Officer',
            company: 'Passerelles numeriques'
        },
        {
          fullName: 'Kristoff Peralta',
          position: 'Communicatons Officer',
          company: 'Passerelles numeriques'
      },
      {
          fullName: 'Kristine Roxa',
          position: '3rd Year Educator',
          company: 'Passerelles numeriques'
      },
    ],
      description: 'OJT-Hunting for Class 2020B'
    },
    {
      id: 3,
      name: 'Introduction to AWS',
      category: 'Online Class',
      speaker: 'Rene Abdallah',
      emcee: '',
      time: '8:00 AM',
      date: '05/03/2020',
      duration: 3,
      venue: {
        address: 'Carmelites Compound',
        building: 'Main Buiding',
        room: 'Computer Lab'
      },
      onlineUrl: 'https://www.aws.com',
      participants: [
        {
            fullName: 'Jun Rey Ansing',
            position: 'Innovative Technology Trainer',
            company: 'Passerelles numeriques'
        },
        {
            fullName: 'Luke Rafael Alcoseba',
            position: 'IT Admin',
            company: 'Passerelles numeriques'
        },
          {
          fullName: 'Marine Le Mezo',
          position: 'IT Trainer/Volunteer',
          company: 'Passerelles numeriques'
      },
    ],
      description: 'Online class for Amazon Web Services'
    },
  ];