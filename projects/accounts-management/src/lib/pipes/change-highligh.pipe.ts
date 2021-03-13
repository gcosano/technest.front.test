import { ElementRef, Pipe, PipeTransform } from '@angular/core';
/*
 * Usage:
 *   value | changeHighlight
*/
@Pipe({name: 'changeHighlight'})
export class ChangeHighlightPipe implements PipeTransform {
  private _currentValue: number;

  constructor(private ref: ElementRef) {}

  transform(value: number): number {
    if (!isNaN(this._currentValue) &&value !== this._currentValue) {
      this.ref.nativeElement.parentNode.style.color = (value > this._currentValue) ? 'green' : 'red';
    }

    this._currentValue = value;
    
    return value;
  }
}
