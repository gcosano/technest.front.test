import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../security.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public credentials: any;
  public errorLogin: boolean;

  constructor(private _securityService: SecurityService) {
    this.credentials = { user: null, pass: null };
    this.errorLogin = false;
  }

  ngOnInit(): void {
  }

  public logIn() {}

  public logInWithGoogle() {
    this._securityService.signInWithGoogle('');
  }

}
