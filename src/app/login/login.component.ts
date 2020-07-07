import { Component, OnInit } from '@angular/core';
import { UserAccount } from "../service/event-model";
import { Router } from "@angular/router";

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(userAccount: UserAccount){
    if(userAccount.username === this.currentUser.username && userAccount.password === this.currentUser.password){
      console.log('allowed');
      this.router.navigate(['/events']);
    }else{
      console.log('not allowed');
      this.router.navigate(['/login']);
    }
  }
}
