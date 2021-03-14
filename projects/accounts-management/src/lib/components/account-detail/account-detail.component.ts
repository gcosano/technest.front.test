import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { AccountsManagementService } from '../../accounts-management.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'technest-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {

  /**
   * Columns with the props to be displayed
   */
  displayedColumns: string[] = ['confirmedDate', 'orderId', 'code', 'type', 'debitAmount', 'creditAmount', 'balance'];

  /**
   * Account matched
   */
  selectedAccount: Account;

  /**
   * Value of the current exchange value
   */
  exchangeRate: number;

  /**
   * Trigger to destroy all the subscriptions at the end
   */
  private _stop$: Subject<boolean> = new Subject(); 
  
  constructor(private accountSrv: AccountsManagementService, private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    /**
     * Initialize the subscription for the accounts list
     * When a new list is pushed, it looks for the match with the current id
     */
    this.accountSrv.accounts$.pipe(
      takeUntil(this._stop$),
      map(accounts => accounts.filter(acc => acc.id == this.route.snapshot.params.id)[0])
    ).subscribe(
      (account: Account) => (this.selectedAccount = account),
      console.error
    )

    /**
     * Initialize the subscription for the exchange rate
     */
    this.accountSrv.exchangeRate$.pipe(takeUntil(this._stop$)).subscribe(
      (exchangeRate: number) => (this.exchangeRate = exchangeRate), 
      console.error
    );
  }
  
  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

}
