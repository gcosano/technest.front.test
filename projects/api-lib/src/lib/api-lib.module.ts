import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TechnestAppLibConfig } from '@technest/technest-app-lib';

import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { environment } from 'src/environments/environment';

import { ApiLibService } from './api-lib.service';
import { SERVER_CONFIG, TECHNEST_APP_CONFIGURATION } from './config/tokens.config';

export function serverConfigFactory(config: TechnestAppLibConfig) { return config?.serverConfig; }

const socketCfg: SocketIoConfig = { url: environment.wssUrl, options: {} };

@NgModule({
  imports: [
    CommonModule,
    SocketIoModule.forRoot(socketCfg)
  ]
})
export class ApiLibModule {

  public static forRoot(config: () => TechnestAppLibConfig): ModuleWithProviders<ApiLibModule> {
    return {
      ngModule: ApiLibModule,
      providers: [
        ApiLibService,
        { provide: TECHNEST_APP_CONFIGURATION, useFactory: config },
        { provide: SERVER_CONFIG, useFactory: serverConfigFactory, deps: [TECHNEST_APP_CONFIGURATION] },
      ]
    }
  }
}

