import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

/**
 * Authorization service will deal with showing login, sending login request, and setting tokens to maintain user credentials.
 * 
 * @author Malcolm Roy
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dialogRef: MatDialogRef<LoginComponent>;
  private loggedIn: boolean;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) { }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token) {
    sessionStorage.setItem('token', token);
  }

  getAuthHeader() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
  }

  /**
   * Used to verify a valid token. Can be used if we want to check a valid token. Each POST, DELETE or PATCH request will be verify token on the server anyway.
   * This could be used if we want to do a more carefull auth before allowing to an area of the app
   */
  isLoggedIn() {
    const headers = this.getAuthHeader();
    return this.http.post<any>('http://demo-golf-coordinator.haymakercoding.com/api/auth/check-logged-in.php', { headers })
    .pipe(map(response => {
      return response;
    }))
  }

  /**
   * Send form to server for authenticating 
   * @param form 
   */
  login(form) {
    const URL = 'http://demo-golf-coordinator.haymakercoding.com/api/auth/login.php';
    return this.http.post<any>(URL, { form })
    .pipe(map(response => {
      return response;
    }))
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['thankyou']);
  }

  /**
   * Display the dialog component containing login, 200 means a token was issued and saved and user should be good to go. 
   * Otherwise just display login again
   */
  showLogin() {
    this.dialogRef = this.dialog.open(LoginComponent, { disableClose: true, maxWidth: 400});
    this.dialogRef.afterClosed().subscribe(response => {
      if (response === 200) {
        this.setLoggedIn(true);
      } else {
        this.setLoggedIn(false);
        this.showLogin();
      }
    });
  }


}
