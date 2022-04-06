
/*
 * Magic Cloud, copyright Aista, Ltd. See the attached LICENSE file for details.
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Date pipe, displaying dates in a friendly format according to user's locale.
 */
@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  /**
   * Transforms a Date object to its locale string representation.
   * 
   * @param value Value to transform
   */
  transform(value: any) {

    /*
     * Some components might return date and time objects as strings, WITHOUT timezone information
     * at which point we'll have to make assumptions. The best assumption is UTC.
     */
    if (value.indexOf && value.indexOf('+') === -1) {
      value += '+00:00';
    }
    const date = new Date(value);
    return date.toLocaleString();
  }
}
