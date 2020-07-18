import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  user: User;
  authError: any;


  ngOnInit() {
    this.user = new User();
    this.authenticationService.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
  }

  register() {
    console.log(this.user);
    this.authenticationService.createUser(this.user);
  }
}
