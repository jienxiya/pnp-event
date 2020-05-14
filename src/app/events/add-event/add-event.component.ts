import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
      speaker: new FormControl()
    })
  }


}
