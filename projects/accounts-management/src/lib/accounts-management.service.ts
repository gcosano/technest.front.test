import { Injectable, OnDestroy } from '@angular/core';

import { ApiLibService } from '@technest/api-lib';

import { interval, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, filter, takeUntil } from 'rxjs/operators';

import { Account } from './models/account.model';

@Injectable()
export class AccountManagementeService implements OnDestroy {

  private _stop$: Subject<boolean> = new Subject();
  private _accountsList: Account[] = [];
  public accounts$: ReplaySubject<Account[]> = new ReplaySubject(1);

  constructor(private apiService: ApiLibService) { 
    interval(15000).pipe(
      takeUntil(this._stop$),
      filter(() => !!this._accountsList.length)
    ).subscribe(
      () => {
        for (const [i, account] of this._accountsList.entries()) {
          const newBalance = (Math.random() * 120);
          const payload = {
            balance: newBalance,
            availableBalance: (newBalance*Math.random())
          }
          
          this.apiService.updateElement('accounts', account.id, payload)
            .subscribe(updatedAccount => Object.assign(account, updatedAccount), console.error);
        }

      }, 
      console.error
    )

  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  onExchangeRateStream(): Observable<number> {
    return this.apiService.getExchangeRateStream();
  }

  retrieveAllAccounts(): void {
    this.apiService.getAllElements('accounts').pipe(
      catchError(() => of([]))
    ).subscribe(
      accounts => {
        this._accountsList = accounts;
        this.accounts$.next(this._accountsList);
      }, 
      console.error
    );
  }
  
}