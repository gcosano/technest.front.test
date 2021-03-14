import { InjectionToken } from "@angular/core";

import { TechnestAppLibConfig } from "@technest/technest-app-lib";

import { SecurityConfig } from "../models/security-config.model";

export const TECHNEST_APP_CONFIGURATION = new InjectionToken<TechnestAppLibConfig>('TECHNEST_APP_CONFIGURATION');
export const SECURITY_CONFIG = new InjectionToken<SecurityConfig>('SECURITY_CONFIG');