import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiLibModule } from '@technest/api-lib';
import { SecurityModule } from '@technest/security';
import { technestAppConfigurationFactory } from './config/technest-app.config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SecurityModule.forRoot(technestAppConfigurationFactory),
    ApiLibModule.forRoot(technestAppConfigurationFactory)
  ],
})
export class TechnestAppLibModule { }
