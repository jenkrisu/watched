import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.getToken().subscribe(
      response => {
        this.authService.setToken(response.body);
      },
      error => {
        console.log(error);
      }
    );
  }

}
