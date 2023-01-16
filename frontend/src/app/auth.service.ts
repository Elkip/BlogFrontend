import { EventEmitter, Injectable } from '@angular/core';
import {DataService} from './data.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Login} from './model/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  isAuthenticated = false;
  authenticationResultEvent = new EventEmitter<boolean>();
  gotRoleEvent = new EventEmitter<string>();
  userDetails: Login = new Login();

  constructor(private dataService: DataService,
              private router: Router) { }

  authenticate(name: string, password: string): void {
    this.dataService.validateUser(name, password).subscribe(() => {
      this.setupRole();
      this.isAuthenticated = true;
      this.authenticationResultEvent.emit(true);
    }, (error) => {
      console.log('error!', error.message);
      this.authenticationResultEvent.emit(false);
    });
  }

  logout(): void {
    this.dataService.logout().subscribe(next => {
      this.isAuthenticated = false;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['login'], { queryParams : {requested : state.url }});
    }
    return this.isAuthenticated;
  }

  setupRole(): void {
    this.dataService.getRole().subscribe(next => {
      this.userDetails = next;
      this.gotRoleEvent.emit(next.role);
    });
  }

  checkIfAlreadyAuthenticated(): void {
    this.dataService.getRole().subscribe(next => {
      if (next.role !== '') {
        this.isAuthenticated = true;
        this.authenticationResultEvent.emit(true);
      }
    });
  }

}
