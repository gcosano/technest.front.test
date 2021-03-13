import { Pipe, PipeTransform } from '@angular/core';
/*
 * Usage:
 *   value | exchange:rate
*/
@Pipe({name: 'exchange'})
export class ExchangePipe implements PipeTransform {
  transform(value: number, exchangeRate?: number): number {
    return value*exchangeRate;
  }
}
