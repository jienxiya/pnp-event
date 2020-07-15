import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Output() event = new EventEmitter
  eventForm: FormGroup;

  get f() { return this.eventForm.controls; }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
      speaker: new FormControl(),
      emcee: new FormControl(),
      date: new FormControl(),
      time: new FormControl(),
      duration: new FormControl(),
      venue: this.fb.group({
        address: new FormControl(),
        building: new FormControl(),
        room: new FormControl(),
      }),
      description: new FormControl()
    })
  }


  submitForm(data) {
    this.event.emit(data)
    this.eventForm.reset()
  }
}


