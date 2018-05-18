import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.interface';
import { Subject } from 'rxjs/subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loggedIn: boolean;
  user: User;
  error = '';

  constructor(private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe(
      value => {
        this.loggedIn = value;
      }
    );

    this.authService.user.subscribe(
      value => {
        this.user = value;
      }
    );

    this.checkSession();
  }

  // This should be moved mostly to the service
  checkSession() {
    if (this.authService.hasSession()) {
      this.authService.account().subscribe(
        response => {
          this.authService.loggedIn.next(true);
          this.authService.user.next(response.body);
        }, error => {
          // Request token prob expired
          this.error = error;
        }
      );
    } else if (this.authService.hasToken()) {
      this.authService.session().subscribe(
        response => {
          if (response.body.success) {
            this.authService.setSession(response.body.session_id);
            this.authService.account().subscribe(
              resp => {
                this.authService.user.next(resp.body);
              }, error => {
                this.error = error;
              }
            );
          }
        }
      );
    }
  }

  logout(event) {
    event.preventDefault();
    this.authService.removeSession();
  }

}
