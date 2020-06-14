import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.pug',
  styleUrls: ['./auth.component.styl'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = true;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;
    let authResponseObservable: Observable<AuthResponse>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authResponseObservable = this.authService.login(email, password);
    } else {
      authResponseObservable = this.authService.signUp(email, password);
    }

    authResponseObservable.subscribe(
      (response) => {
        this.isLoading = false;
        form.reset();
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  loginWithTestUser() {
    let authResponseObservable: Observable<AuthResponse>;

    this.isLoading = true;
    authResponseObservable = this.authService.login('test@test.test', 'test@test.test');
    authResponseObservable.subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }
}
