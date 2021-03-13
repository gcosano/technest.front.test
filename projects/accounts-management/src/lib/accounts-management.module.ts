import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountsManagementRoutingModule } from './accounts-management-routing.module';
import { AccountManagementeService } from './accounts-management.service';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ExchangePipe } from './pipes/exchange.pipe';

@NgModule({
  declarations: [AccountsListComponent, ExchangePipe],
  imports: [
    CommonModule,
    AccountsManagementRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [AccountsListComponent],
  providers: [AccountManagementeService]
})
export class AccountsManagementModule { }
