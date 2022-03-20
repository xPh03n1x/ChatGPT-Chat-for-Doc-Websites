
/*
 * Magic Cloud, copyright Aista, Ltd. See the attached LICENSE file for details.
 */

// Angular and system imports.
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Keeps track of what theme we're currently using
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _themeChanged: BehaviorSubject<string>;

  // Name of theme currently used, either 'light' or 'dark'.
  private _theme: string;

  /**
   * To allow consumers to subscribe to theme change events.
   */
   themeChanged: Observable<boolean>;

  /**
   * Creates an instance of your type.
   */
  constructor() {
    this._theme = localStorage.getItem('theme');
    this._themeChanged = new BehaviorSubject<string>(this._theme);
  }

  /**
   * Returns theme to caller.
   */
  get theme() {
    return this._theme;
  }

  /**
   * Sets theme to specified value and persists into localStorage.
   */
  set theme(value: string) {
    switch (value) {

      case 'light':
      case 'dark':
        localStorage.setItem('theme', value);
        this._theme = value;
        this._themeChanged.next(value);
        break;

      default:
        throw `Theme '${value}' does not exist`;
      }
  }
}
