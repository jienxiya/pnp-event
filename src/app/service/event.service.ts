import { Injectable } from '@angular/core';
import { EventModel, Participants } from '../service/event-model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  listOfEvent= EVENTS;
  event:EventModel
  events:Observable<EventModel[]>
  private eventDoc:AngularFirestoreDocument<EventModel>
  private eventsCollection: AngularFirestoreCollection<EventModel>
  fEvent:Observable<EventModel[]>

  constructor(private firestore: AngularFirestore) { 
    this.eventsCollection = firestore.collection<EventModel>('events', ref => ref.orderBy('id','asc'));
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(action=>action.map(a=>{
        const data = a.payload.doc.data() as EventModel
        const id = a.payload.doc.id
        return {id, ...data}
      }))
    )
  }

  getEvents() {
    return this.events;
  }

  getEvent(){
    return this.firestore.collection('events').snapshotChanges();
  }
  
  addEvent(event: EventModel) {
    this.eventsCollection.ref.get().then(querySnapshot => {
      console.log(querySnapshot.size);
      event.id = querySnapshot.size;
      this.eventsCollection.add(event);
    })
  }
  
  // updateEvent(event: EventModel) {
  //   this.eventsCollection.ref.where('id', '==', event.id)
  //   .get().then(querySnapshot => {
  //     querySnapshot.foreach(doc => {
  //       this.eventDoc = this.afs.doc<EventModel>('events/' + doc.id);
  //       this.eventDoc.update(event);
  //     })
  //   })
  // }

// addData(){
//   return this.firestore.collection('events').add(this.listOfEvent[3]);
// }

  updateEvent(event:EventModel){
    this.eventsCollection.ref.where('id','==', event.id).get()
      .then(res=>{
        res.forEach(doc =>{
          this.eventDoc = this.firestore.doc<EventModel>('events/' + doc.id)
          this.eventDoc.update(event);
        })
      })
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