import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Account, Order } from '@technest/accounts-management';

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
  ) {}

  /**
   * Method to return the socket subscription
   * @returns An observable with the stream value
   */
  getExchangeRateStream(): Observable<number> {
    return this.socket.fromEvent('exchange-rate');
  }

  /**
   * Method to retrieve a list of elements
   * @param type element topic to retrieve
   * @returns An observable of the elements topic
   */
  getAllElements(type: string): Observable<(Account | Order)[]>{
    if (!this.serverConfig?.restBaseUrl) {
      throw new Error('Rest config is not provided!');
    }

    const url = `${this.serverConfig.restBaseUrl}/${type}`;
    return this.http.get<(Account | Order)[]>(url).pipe(catchError(err => throwError(err)));
  }
  
  /**
   * Method to update an element
   * @param type element topic to update
   * @param id id of the element
   * @param payload object with the props to update
   * @returns An observable of the element topic
   */
  updateElement(type: string, id: string, payload: Object): Observable<Account | Order> {
    if (!this.serverConfig?.restBaseUrl) {
      throw new Error('Rest config is not provided!');
    }

    const url = `${this.serverConfig.restBaseUrl}/${type}/${id}`;
    return this.http.patch<Account | Order>(url, payload).pipe(catchError(err => throwError(err)));
  }

}
