import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = new FormControl('');
  password = new FormControl('');

  constructor(private service: LoginService) {
  }

  signIn(e) {
    e.preventDefault();
    const login = this.login.value;
    const password = this.password.value;
    this.service.signIn(login, password).subscribe(user => {
      window.localStorage.setItem('token', user.token)
    });
  }

  ngOnInit(): void {
  }

}
