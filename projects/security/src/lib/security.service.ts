import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SecurityService {

  constructor(private _authService: AuthService, private _route: Router) {
  }

  /**
   * Method to sign in with google API
   * @param navUrl - (optional) route's url to navigate if process has been succesfully completed
   */
  public signInWithGoogle(navUrl: string) {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(
        (info: SocialUser) => this.getTokenInfo(info?.idToken).subscribe(_ => this._route.navigate([navUrl]), console.error),
        console.error
      );
  }

  /**
   * Method to retrieve all info about a given token ID with google API
   * Then token expiration time is stored if the request has been successfully completed
   * @param tokenID token ID to get info
   */
  public getTokenInfo(tokenID) {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenID}`;

    return ajax.getJSON(url, { 'Content-Type': 'application/json' }).pipe(
      tap(info => localStorage.setItem('tokenInfo', info?.exp)),
      map<any, string>(info => JSON.stringify(info))
    );
  }

  /**
   * Check if token still is valid and returns the result
   */
  public checkValidityToken(): Observable<boolean> {
    return of(localStorage.getItem('tokenInfo')).pipe(
      map<string, number>(info => JSON.parse(info)),
      // Exp. time is given in secs to operates we parse actual time from millis to secs
      map<number, number>(expTime => (expTime - Math.floor(new Date().getTime() / 1000))),
      // Google set token expiration time in 1 hour, we reduce until 5 minutes his validity
      map<number, boolean>(result => (result > 3300))
      // map<number, boolean>(result => (result > 3300))
    );
  }

}
