import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountsManagementRoutingModule } from './accounts-management-routing.module';
import { AccountsManagementService } from './accounts-management.service';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExchangePipe } from './pipes/exchange.pipe';
import { ChangeHighlightPipe } from './pipes/change-highlight.pipe';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';

@NgModule({
  declarations: [
    AccountsListComponent,
    AccountDetailComponent,
    ExchangePipe,
    ChangeHighlightPipe
  ],
  imports: [
    CommonModule,
    AccountsManagementRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [AccountsListComponent, AccountDetailComponent],
  providers: [AccountsManagementService]
})
export class AccountsManagementModule { }
