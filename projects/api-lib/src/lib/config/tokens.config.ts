import { InjectionToken } from "@angular/core";
import { SocketIoConfig } from "ngx-socket-io";

export const BASE_URL_CONFIG = new InjectionToken<string>('baseURLConfig');
export const SOCKET_CONFIG = new InjectionToken<SocketIoConfig>('socketConfig');