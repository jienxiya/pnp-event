import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  // eventForm: FormGroup;

  // constructor() { }

  // ngOnInit(): void {
  //   this.eventForm = new FormGroup({
  //     name: new FormControl(),
  //     category: new FormControl(),
  //     speaker: new FormControl()
  //   })
  // }
  @Output() event = new EventEmitter
  eventForm: FormGroup;
  private formSubmitAttempt: boolean;
  submitted = false
  invalid = false;

  get f() { return this.eventForm.controls; }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
     this.eventForm = this.fb.group({
      name: ['', Validators.required ],
      category: ['', Validators.required ],
      speaker: ['', Validators.required ],
      emcee: ['', Validators.required ],
      date: ['', Validators.required ],
      time: ['', Validators.required ],
      duration:['', Validators.required ],
      venue: this.fb.group({
        address:['', Validators.required ],
        building:['', Validators.required ],
        room:['', Validators.required ]
      }),
      participants: new FormControl([]),
      onlineUrl:['', Validators.required ],
      description:['', Validators.required ]
    });
  }

   isFieldInvalid(field: string) {
    //  if((!this.eventForm.get(field).valid && this.eventForm.get(field).touched) || (this.eventForm.get(field).untouched && this.formSubmitAttempt)){
    //   this.invalid = true;
    //  }
     
    return (
      (!this.eventForm.get(field).valid && this.eventForm.get(field).touched) ||
      (this.eventForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  submitForm(data){
    
    //  if(this.invalid == false){
      this.submitted = true
      this.event.emit(data)
      console.log(data);
    this.formSubmitAttempt = true
    this.eventForm.reset()
    // }
    
  }
}


