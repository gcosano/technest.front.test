import { InjectionToken } from "@angular/core";
import { TechnestAppLibConfig } from "@technest/technest-app-lib";

import { ServerConfig } from "../models/server-config.model";

export const TECHNEST_APP_CONFIGURATION = new InjectionToken<TechnestAppLibConfig>('TECHNEST_APP_CONFIGURATION');
export const SERVER_CONFIG = new InjectionToken<ServerConfig>('SERVER_CONFIG');