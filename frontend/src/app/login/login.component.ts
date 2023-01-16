import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  message = '';
  name: string;
  password: string;
  subscription: Subscription;
  submitted = false;

  constructor(private authService: AuthService,
              private route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationResultEvent.subscribe(result => {
      if (result) {
        const url = this.activatedRoute.snapshot.queryParams.requested;
        this.route.navigateByUrl(url);
      } else {
        this.message = 'Login Failed - Please Try Again';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // TODO: Catch errors and display error
  onSubmit(): void {
    this.submitted = true;
    this.authService.authenticate(this.name, this.password);
  }

}
