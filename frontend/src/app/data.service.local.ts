import { Injectable } from '@angular/core';
import {Contact} from './model/Contact';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messages: Array<Contact>;

  getMessages(): Observable<Array<Contact>> {
    return of(this.messages);
  }

  newMessage(message: Contact): Observable<Contact> {
    let id = 0;
    for (const mes of this.messages) {
      const i = Number(mes.id);
      if ( i > id) {
        id = i;
      }
    }
    message.id = String(id + 1);
    this.messages.push(message);
    return of(message);
  }

  constructor() {
    this.messages = new Array<Contact>();
    const mes1 = new Contact();
    mes1.id = '1';
    mes1.message = 'Hello World!';
    mes1.email = 'Hello@World.com';
    mes1.name = 'Mr. Worldwide';
    this.messages.push(mes1);

    const mes2 = new Contact();
    mes2.id = '2';
    mes2.message = 'F*** Off';
    mes2.email = 'YoloMcSwaggins@yo.com';
    mes2.name = 'Ur Mom';
    this.messages.push(mes2);
  }
}
