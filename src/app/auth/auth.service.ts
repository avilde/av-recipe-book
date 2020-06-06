import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmailSignUpError } from './types';

interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCYS1u6E_00dJLkcBLVmGgrC9oZqN6st1s',
      {
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error occured.';
      console.log(errorResponse)
      const errorCode = errorResponse?.error?.error?.message;

      if (!errorCode) {
        return throwError(errorMessage);
      }

      if (EmailSignUpError.hasOwnProperty(errorCode)) {
        return throwError(EmailSignUpError[errorCode]);
      } else {
        return throwError(errorMessage);
      }
    }));
  }
}
