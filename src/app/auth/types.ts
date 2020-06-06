export enum AuthError {
    EMAIL_EXISTS = 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED = 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER = 'We have blocked all requests from this device due to unusual activity. Try again later.'
}

export enum AuthEndpoint {
    SIGN_UP = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser',
    SIGN_IN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
}

export const AUTH_API_KEY = 'AIzaSyCYS1u6E_00dJLkcBLVmGgrC9oZqN6st1s';