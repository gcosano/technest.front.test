import { ServerConfig } from "@technest/api-lib";
import { SecurityConfig } from "@technest/security";

export interface TechnestAppLibConfig {
    securityConfig: SecurityConfig;
    serverConfig: ServerConfig;
}