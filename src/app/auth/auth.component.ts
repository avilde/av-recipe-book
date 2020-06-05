import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.pug',
  styleUrls: ['./auth.component.styl'],
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    if (this.isLoginMode) {
      // TODO: login
    } else {
      const { email, password } = form.value;

      this.authService.signUp(email, password).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log(error)
      );

      form.reset();
    }
  }
}
