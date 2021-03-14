import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiLibService, ServerConfig, SERVER_CONFIG } from '@technest/api-lib';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AccountsManagementService } from '../accounts-management.service';


const mockServerConfig: ServerConfig = { wssUrl: 'testWsURL', restBaseUrl: 'testRestURL' };
const mockSocketConfig: SocketIoConfig = { url: mockServerConfig.wssUrl, options: {} };

@NgModule({
  imports: [
    HttpClientTestingModule,
    SocketIoModule.forRoot(mockSocketConfig),
    RouterTestingModule
  ],
  providers: [
    AccountsManagementService,
    ApiLibService,
    { provide: SERVER_CONFIG, useValue: mockServerConfig }
  ]
})
export class AccountsManagementTestingModule { }
