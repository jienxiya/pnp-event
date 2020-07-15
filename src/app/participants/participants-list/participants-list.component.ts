import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {
  fullName;
  position;
  company;

  @Input() participants: any;
  @Output() backButton = new EventEmitter();
  @Output() addParticipant = new EventEmitter();
  @Output() participant = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  returnToList() {
    this.backButton.emit();
  }

  register(data){
    this.addParticipant.emit(data);
    this.fullName = '';
    this.position = '';
    this.company = '';
  }

  removeParticipant(participant:any){
    this.participant.emit(participant);
  }
}
