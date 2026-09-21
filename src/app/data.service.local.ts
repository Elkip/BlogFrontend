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
    const mes1 = new Contact('1', 'Hello World!', 'Hello@World.com', 'Mr. Worldwide', 9);
    this.messages.push(mes1);
    const mes2 = new Contact('2', 'F*** Off', 'YoloMcSwaggins@yo.com', 'Ur Mom', 0);
    this.messages.push(mes2);
  }
}
