import { Component } from '@angular/core';

import { SecurityService } from '../../security.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _securityService: SecurityService) {
  }

  public logInWithGoogle() {
    this._securityService.signInWithGoogle('');
  }

}
