import { Injectable, OnDestroy } from '@angular/core';
import { ApiLibService } from '@technest/api-lib';
import { Observable, Subject } from 'rxjs';
import { Account } from './models/account.model';

@Injectable()
export class AccountManagementeService implements OnDestroy {

  private _stop$: Subject<boolean> = new Subject();

  constructor(private apiService: ApiLibService) { 
  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  onExchangeRateStream(): Observable<number> {
    return this.apiService.getExchangeRateStream();
  }

  retrieveAllAccounts(): Observable<Account[]> {
    return this.apiService.getAllElements('accounts');
  }
  
}