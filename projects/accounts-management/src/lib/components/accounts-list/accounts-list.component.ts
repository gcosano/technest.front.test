import { Component, OnInit } from '@angular/core';
import { AccountManagementeService } from '../../accounts-management.service';

@Component({
  selector: 'technest-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {

  constructor(public accountManagementeService: AccountManagementeService) { }

  ngOnInit(): void {
    this.accountManagementeService.receiveChat().subscribe(console.log, console.error);
  }

}
