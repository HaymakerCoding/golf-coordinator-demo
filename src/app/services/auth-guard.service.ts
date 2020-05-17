import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard the app routes with a basic guard.
 * Used in conjuction with the auth service we will simply test that a session token is set for the user.
 * If not we will give them a login screen which will send them on if they can authenticate
 * 
* @author Malcolm Roy
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken()) {
      // they have a token, let them proceed, validating the token will be done on server
      return true;
    } else {
      // no token, login! Store the page to proceed to and let the login to deal with them
      console.log(next.url[0].path);
      localStorage.setItem('destination', next.url[0].path);
      this.authService.showLogin();
      return false;
    }
  }

}
