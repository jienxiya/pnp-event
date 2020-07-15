import { Component, OnInit } from '@angular/core';
import { UserAccount } from "../service/event-model";
import { Router } from "@angular/router";
import { EventService } from "../service/event.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
username;
password;
currentUser: UserAccount = {
  username: 'mj',
  password: 'password'
}

  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
  }

  login(userAccount: UserAccount){
    if(userAccount.username === this.currentUser.username && userAccount.password === this.currentUser.password){
      this.eventService.updateCurrentUser(userAccount);
      this.router.navigate(['/events']);
    } else{
      console.log('not authorized');
    } 
  }
}
