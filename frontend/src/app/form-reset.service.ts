import { EventEmitter, Injectable } from '@angular/core';
import {Contact} from './model/Contact';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetContactFormEvent = new EventEmitter<Contact>();

  constructor() { }
}
