import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SecurityService } from './security.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private _redirectToUrl: string;

    constructor(private _securityService: SecurityService, private _router: Router) {
        this._redirectToUrl = 'login';
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._securityService.checkValidityToken().pipe(
            tap(
                allowed => {
                    if (!allowed) {
                        localStorage.removeItem('tokenInfo');
                        this._router.navigate([this._redirectToUrl]);
                    }
                },
                console.error
            )
        );
    }

}
