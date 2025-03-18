import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent implements OnInit, OnDestroy {

  navbarCollapsed = true;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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

  navigateToBlog(): void {
    this.router.navigate(['blog']);
  }

  navigateToContact(): void {
    this.router.navigate(['contact']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['login']);
  }

}
