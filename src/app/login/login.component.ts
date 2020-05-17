import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(),
      password: new FormControl()
    })
  }

  submitForm(form) {
    this.subscriptions.push(this.authService.login(form).subscribe(response => {
      if (response.status === 200) {
        this.authService.setToken(response.payload);
        this.router.navigate([localStorage.getItem('destination')]);
      }
      this.dialogRef.close(response.status)
    }));
  }

}
