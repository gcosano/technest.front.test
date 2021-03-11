import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityService } from './security.service';
import {MatCardModule} from '@angular/material/card';

export function provideConfig(clientID: string) {
  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(clientID)
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
  static forRoot(clientID: string): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [
        {
          provide: AuthServiceConfig,
          useFactory: () => provideConfig(clientID)
        },
        AuthGuard,
        SecurityService
      ]
    };
  }
}
