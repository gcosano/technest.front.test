import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AccountManagementeService } from '../../accounts-management.service';
import { Account } from '../../models/account.model';

@Component({
  selector: 'technest-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'tag', 'balance', 'availableBalance'];
  accountsList: Account[] = [];
  exchangeRate$: Observable<number>;

  constructor(private accountSrv: AccountManagementeService) { }

  ngOnInit(): void {
    this.accountSrv.retrieveAllAccounts();

    this.accountSrv.accounts$.subscribe(accounts => (this.accountsList = accounts), console.error);
      
    this.exchangeRate$ = this.accountSrv.onExchangeRateStream().pipe(
      catchError(() => of(1))
    );
  }

}
