import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { AuthError, AuthEndpoint, AUTH_API_KEY } from './types';
import { User } from './user.module';

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
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${AuthEndpoint.SIGN_IN}?key=${AUTH_API_KEY}`, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleAuthErrorResponse),
        tap(responseData => {
          const { email, localId, idToken, expiresIn } = responseData;
          this.handleAuthResponse(email, localId, idToken, +expiresIn);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${AuthEndpoint.SIGN_IN}?key=${AUTH_API_KEY}`, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleAuthErrorResponse),
        tap(responseData => {
          const { email, localId, idToken, expiresIn } = responseData;
          this.handleAuthResponse(email, localId, idToken, +expiresIn);
        })
      );
  }

  private handleAuthResponse(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const user = new User(
      email,
      id,
      token,
      new Date(new Date().getTime() + +expiresIn * 1000)
    );

    this.user.next(user);
  }

  private handleAuthErrorResponse(errorResponse: HttpErrorResponse) {
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
  }
}
