import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SERVER_CONFIG } from './config/tokens.config';
import { ServerConfig } from './models/server-config.model';

@Injectable()
export class ApiLibService {

  constructor(
    @Inject(SERVER_CONFIG) private serverConfig: ServerConfig,
    private socket: Socket,
    private http: HttpClient
  ) { 
    
  }

  getExchangeRateStream(): Observable<number> {
    return this.socket.fromEvent('exchange-rate');
  }

  getAllElements(type: string): Observable<any>{
    if (!this.serverConfig?.restBaseUrl) {
      throw new Error('Rest config is not provided!');
    }

    const url = `${this.serverConfig.restBaseUrl}/${type}`;
    return this.http.get(url).pipe(catchError(err => throwError(err)));
  }
  
  updateElement(type: string, id: string, payload: Object): Observable<any> {
    if (!this.serverConfig?.restBaseUrl) {
      throw new Error('Rest config is not provided!');
    }

    const url = `${this.serverConfig.restBaseUrl}/${type}/${id}`;
    return this.http.patch(url, payload).pipe(catchError(err => throwError(err)));
  }

}
