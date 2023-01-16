import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  navbarCollapsed = true;
  isLoggedIn = false;
  subscription: Subscription;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationResultEvent.subscribe(result => {
      if (result) {
        this.isLoggedIn = true;
      }
    });
    this.authService.checkIfAlreadyAuthenticated();
    this.isLoggedIn = this.authService.isAuthenticated;

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }

  navigateToAbout(): void {
    this.router.navigate(['about']);
  }

  navigateToPortfolio(): void {
    this.router.navigate(['portfolio']);
  }

  navigateToContact(): void {
    this.router.navigate(['contact']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['admin']);
    this.isLoggedIn = this.authService.isAuthenticated;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
