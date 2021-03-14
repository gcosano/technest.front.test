import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountsManagementService } from '../../accounts-management.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'technest-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, OnDestroy {

  /**
   * Columns with the props to be displayed
   */
  displayedColumns: string[] = ['name', 'category', 'tag', 'balance', 'availableBalance'];

  /**
   * List of accounts to be shown
   */
  accountsList: Account[] = [];

  /**
   * Value of the current exchange value
   */
  exchangeRate: number;

  /**
   * Trigger to destroy all the subscriptions at the end
   */
  private _stop$: Subject<boolean> = new Subject();

  constructor(private accountSrv: AccountsManagementService, private router: Router) { }

  ngOnInit(): void {
    /**
     * Initialize the subscription for the accounts list
     */
    this.accountSrv.accounts$.pipe(takeUntil(this._stop$)).subscribe(
      (accounts: Account[]) => (this.accountsList = accounts), 
      console.error
    );
      
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

  /**
   * Method to show the detail of a selected account
   * @param id of the clicked account
   */
  onShowDetail(id: string) {
    this.router.navigateByUrl(`/accounts/${id}`);
  }

}
