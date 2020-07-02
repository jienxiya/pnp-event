import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventModel } from "../../service/event-model";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { DomElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  // eventList = []
  @Input() event: any;
  @Output() id = new EventEmitter();
  @Output() data = new EventEmitter();
  
  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {
  }

  sendID(data: any){
    this.id.emit(data)
  }

  deleteEvent(data:any){
    this.data.emit(data)
    // const uid = data.id.toString()
    // console.log("id", uid);
    // return this.db.collection('events').doc().delete().then(res=>{
    //   alert(res)
    // });
  }
}
