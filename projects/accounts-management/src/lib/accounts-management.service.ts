import { Injectable, OnDestroy } from '@angular/core';

import { ApiLibService } from '@technest/api-lib';

import { combineLatest, interval, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, filter, map, takeUntil } from 'rxjs/operators';

import { Account } from './models/account.model';

@Injectable()
export class AccountsManagementService implements OnDestroy {

  /**
   * Trigger to destroy all the subscriptions at the end
   */
  private _stop$: Subject<boolean> = new Subject();

  /**
   * "stream" of accounts retrieved or updated
   */
  public accounts$: ReplaySubject<Account[]> = new ReplaySubject(1);

  /**
   * "stream" of exchange rate value pushed by the socket
   */
  public exchangeRate$: ReplaySubject<number> = new ReplaySubject(1);

  constructor(private apiService: ApiLibService) { 

    /**
     * the service is singleton so the "streams" are initialized here
     */
    this.onExchangeRateStream();
    this.retrieveAllAccounts();

    /**
     * Proposal method to fake the updating every 40 secs of the accounts balances 
     */
    combineLatest([interval(40000), this.accounts$]).pipe(
      takeUntil(this._stop$),
      map<[number, Account[]], Account[]>(([_, data]) => data),
      filter(accounts => !!accounts.length)
    ).subscribe(
      (accounts: Account[]) => {
        for (const account of accounts) {
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
    );
    
  }

  ngOnDestroy(): void {
    this._stop$.complete();
    this.accounts$.complete();
    this.exchangeRate$.complete();
  }

  /**
   * Method to retrieve the exchange value from the socket
   */
  onExchangeRateStream(): void {
    this.apiService.getExchangeRateStream().pipe(
      catchError(() => of(0))
    ).subscribe(
      exchangeRate => this.exchangeRate$.next(exchangeRate),
      console.error
    );
  }

  /**
   * Method to retrieve all the accounts from the request
   */
  retrieveAllAccounts(): void {
    this.apiService.getAllElements('accounts').pipe(
      catchError(() => of([]))
    ).subscribe(
      (accounts: Account[]) => this.accounts$.next(accounts), 
      console.error
    );
  }
  
}