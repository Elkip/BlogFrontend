import { Injectable } from '@angular/core';
import {Contact} from './model/Contact';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  newMessage(message: Contact): Observable<any> {
    // Create a request without ID
    console.table(message);
    const correct = { name: message.name, email: message.email, message: message.message };
    console.table(correct);
    return this.http.post<any>(environment.apiUrl + '/contact/send', correct);
  }

  constructor(private http: HttpClient) {
  }

}
