import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementeService {

  constructor(private socket: Socket) { 
  }

  receiveChat(){
    return this.socket.fromEvent('exchange-rate');
  }

}