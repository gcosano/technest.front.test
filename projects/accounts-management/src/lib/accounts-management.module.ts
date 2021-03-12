import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountsManagementRoutingModule } from './accounts-management-routing.module';
import { AccountManagementeService } from './accounts-management.service';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

@NgModule({
  declarations: [AccountsListComponent],
  imports: [
    CommonModule,
    AccountsManagementRoutingModule
  ],
  exports: [AccountsListComponent],
  providers: [AccountManagementeService]
})
export class AccountsManagementModule { }
