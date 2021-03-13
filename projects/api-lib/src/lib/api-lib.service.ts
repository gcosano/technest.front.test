import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiLibService {

  constructor(private socket: Socket, private http: HttpClient) { 
    
  }

  getExchangeRateStream(): Observable<number> {
    return this.socket.fromEvent('exchange-rate');
  }

  getAllElements(type: string): Observable<any>{
    const url = `${environment.baseUrl}/${type}`;
    return this.http.get(url).pipe(catchError(err => throwError(err)));
  }

}
