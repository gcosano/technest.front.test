import { ServerConfig } from "@technest/api-lib";
import { SecurityConfig } from "@technest/security";

import { environment } from "src/environments/environment";

import { TechnestAppLibConfig } from "../models/technest-app-lib-config.model";


export function technestAppConfigurationFactory(): TechnestAppLibConfig {
    const securityConfig: SecurityConfig = {
        clientID: environment.clientID
    }

    const serverConfig: ServerConfig = {
        wssUrl: environment.wssUrl,
        restBaseUrl: environment.baseUrl
    }

    return {
        securityConfig: securityConfig,
        serverConfig: serverConfig
    }
}