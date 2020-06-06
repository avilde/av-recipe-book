import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthError, AuthEndpoint, AUTH_API_KEY } from './types';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${AuthEndpoint.SIGN_IN}?key=${AUTH_API_KEY}`, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(errorResponse => {
          let errorMessage = 'An unknown error occured.';
          const errorCode = errorResponse?.error?.error?.message;

          if (!errorCode) {
            return throwError(errorMessage);
          }

          if (AuthError.hasOwnProperty(errorCode)) {
            return throwError(AuthError[errorCode]);
          } else {
            return throwError(errorMessage);
          }
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      `${AuthEndpoint.SIGN_IN}?key=${AUTH_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }
}
