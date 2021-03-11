import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountsManagementRoutingModule } from './accounts-management-routing.module';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';

@NgModule({
  declarations: [AccountsListComponent],
  imports: [
    CommonModule,
    AccountsManagementRoutingModule
  ],
  exports: [AccountsListComponent]
})
export class AccountsManagementModule { }
