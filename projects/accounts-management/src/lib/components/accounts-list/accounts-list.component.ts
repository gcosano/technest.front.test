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

  displayedColumns: string[] = ['name', 'category', 'tag', 'balance', 'availableBalance'];
  accountsList: Account[] = [];
  exchangeRate: number;
  private _stop$: Subject<boolean> = new Subject();

  constructor(private accountSrv: AccountsManagementService, private router: Router) { }

  ngOnInit(): void {
    this.accountSrv.accounts$.pipe(takeUntil(this._stop$)).subscribe(
      (accounts: Account[]) => (this.accountsList = accounts), 
      console.error
    );
      
    this.accountSrv.exchangeRate$.pipe(takeUntil(this._stop$)).subscribe(
      (exchangeRate: number) => (this.exchangeRate = exchangeRate), 
      console.error
    );
  }o

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  onShowDetail(id: string) {
    this.router.navigateByUrl(`/accounts/${id}`);
  }

}
