import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { TechnestAppLibConfig } from '@technest/technest-app-lib';

import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TECHNEST_APP_CONFIGURATION } from './config/tokens.config';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityService } from './security.service';

export function provideConfigFactory(config: TechnestAppLibConfig) {
  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(config?.securityConfig?.clientID)
    }
  ]);
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    SecurityRoutingModule,
    MatCardModule
  ],
  exports: [LoginComponent]
})

export class SecurityModule {
  static forRoot(config: () => TechnestAppLibConfig): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        { provide: TECHNEST_APP_CONFIGURATION, useFactory: config },
        {
          provide: AuthServiceConfig,
          useFactory: provideConfigFactory,
          deps: [TECHNEST_APP_CONFIGURATION]
        },
        AuthGuard,
        SecurityService
      ]
    };
  }
}
