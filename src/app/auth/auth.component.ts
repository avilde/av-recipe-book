import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.pug',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = '';

  constructor(private authService: AuthService) {}

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
      response => {
        console.log(response);
        this.isLoading = false;
        form.reset();
      },
      error => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }
}
