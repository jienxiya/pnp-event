import { Injectable } from '@angular/core';
import { EventModel, UserAccount } from '../service/event-model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event:EventModel
  events:Observable<EventModel[]>
  private eventDoc:AngularFirestoreDocument<EventModel>
  private eventsCollection: AngularFirestoreCollection<EventModel>
  fEvent:Observable<EventModel[]>

  userAccount = new BehaviorSubject<UserAccount>({username:'',password:''})
  currentUserAccount = this.userAccount.asObservable();

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

  deleteEvent(data){
    this.eventsCollection.ref.where('id','==', data.id).get()
      .then(res=>{
        res.forEach(doc =>{
          this.eventDoc = this.firestore.doc<EventModel>('events/' + doc.id)
          this.eventDoc.delete();
        })
      })
  }
  
  addEvent(event: EventModel) {
    this.eventsCollection.ref.get().then(querySnapshot => {
      console.log(querySnapshot.size);
      event.id = querySnapshot.size;
      this.eventsCollection.add(event);
    })
  }
  
  updateEvent(event:EventModel){
    this.eventsCollection.ref.where('id','==', event.id).get()
      .then(res=>{
        res.forEach(doc =>{
          this.eventDoc = this.firestore.doc<EventModel>('events/' + doc.id)
          this.eventDoc.update(event);
        });
      });
  }

  updateCurrentUser(userAccount: UserAccount){
    this.userAccount.next(userAccount);
  }

  async getEvent(id: number):Promise<EventModel> {
    let event: EventModel;
    await this.eventsCollection.ref.where('id', '==', Number(id))
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        event = doc.data() as EventModel;
      });
    });
    return event;
  }
}



