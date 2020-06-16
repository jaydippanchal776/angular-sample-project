import { Injectable } from '@angular/core';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  _config = {}
  constructor() { 
    this._config = config;    
  }
}
