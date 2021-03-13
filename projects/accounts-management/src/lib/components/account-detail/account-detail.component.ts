import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AccountManagementeService } from '../../accounts-management.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'technest-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['confirmedDate', 'orderId', 'code', 'type', 'debitAmount', 'creditAmount', 'balance'];
  selectedAccount: Account;
  exchangeRate: number;
  private _stop$: Subject<boolean> = new Subject(); 
  
  constructor(private accountSrv: AccountManagementeService, private router: Router, private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.accountSrv.retrieveAllAccounts();
    this.accountSrv.onExchangeRateStream();

    this.accountSrv.accounts$.pipe(
      takeUntil(this._stop$),
      map(accounts => accounts.filter(acc => acc.id == this.route.snapshot.params.id)[0])
    ).subscribe(
      account => (this.selectedAccount = account),
      console.error
    )

    this.accountSrv.exchangeRate$.pipe(takeUntil(this._stop$)).subscribe(
      exchangeRate => (this.exchangeRate = exchangeRate), 
      console.error
    );
  }
  
  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

}
