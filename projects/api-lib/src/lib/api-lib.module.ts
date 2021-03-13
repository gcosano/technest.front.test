import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ApiLibService } from './api-lib.service';

const socketCfg: SocketIoConfig = { url: environment.wssUrl, options: {} };

@NgModule({
  imports: [
    CommonModule,
    SocketIoModule.forRoot(socketCfg),
  ],
  providers: [ApiLibService]
})
export class ApiLibModule { }

