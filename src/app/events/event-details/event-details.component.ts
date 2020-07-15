import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventModel, Participants } from "../../service/event-model";
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "../../service/event.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  @Input() event: any;
  @Output() id = new EventEmitter();
  @Output() data = new EventEmitter();
  
  constructor(
    db: AngularFirestore, 
    private route: ActivatedRoute, 
    private router: Router,
    private eventService: EventService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.eventService.getEvent(this.route.snapshot.params.id)
    .then(event => this.event = event as EventModel);
  }

  // deleteEvent(data:any){
  //   this.data.emit(data)
  // }

  // deleteEvent(data:any){
  //   this.eventService.deleteEvent(data)
  // }

  viewEventList() {
    this.router.navigate(['/events'])
  }

  addParticipant(participant: Participants) {
    this.event.participants.push(participant)
    this.eventService.updateEvent(this.event)
  }
  
  removeParticipant(par:any){
    const id =  this.event.participants.indexOf(par)
    this.event.participants.splice(id)
    this.eventService.updateEvent(this.event) 
  }
}
