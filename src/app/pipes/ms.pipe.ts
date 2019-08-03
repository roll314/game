import {Pipe, PipeTransform} from '@angular/core';

export const MS_IN_SEC = 1000;

@Pipe({
  name: 'ms2sec'
})
export class MsPipe implements PipeTransform {
  transform(value: any, decimals: number = 0): string {
    const floatValue = parseFloat(value);
    if (isNaN(floatValue)) {
      return '';
    }

    const rounder = Math.pow(10, decimals);

    const res = Math.round(floatValue / MS_IN_SEC / rounder) * rounder;

    return res.toString();
  }
}
