import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = new User();
  openSignUp: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    this.authenticationService.login(this.user.user_email, this.user.user_password);
  }
}
