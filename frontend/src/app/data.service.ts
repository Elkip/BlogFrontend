import { Injectable } from '@angular/core';
import {Contact} from './model/Contact';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Login} from './model/Login';
import {Blog} from './model/Blog';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getLastMessage(): Observable<Contact> {
    return this.http.get<Contact>(environment.restUrl + '/contact/findLast', { withCredentials: true });
  }

  newMessage(message: Contact): Observable<any> {
    // Create a request without ID
    console.table(message);
    const correct = { name: message.name, email: message.email, message: message.message };
    console.table(correct);
    return this.http.post<any>(environment.restUrl + '/contact/send', correct);
  }

  validateUser(name: string, password: string): Observable<{result: string}> {
    const authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic  ${authData}`
    });
    return this.http.get<{ result: string }>(environment.restUrl + '/login', { headers, withCredentials: true } );
  }

  getRole(): Observable<Login> {
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this.http.get<Login>(environment.restUrl + '/getRole', { headers, withCredentials: true })
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            console.log('Client is not logged in');
            return EMPTY;
          } else {
            return throwError(err);
          }
        })
      );

  }

  logout(): Observable<{result: string}> {
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this.http.get<{result: string}>(environment.restUrl + '/logout', { headers, withCredentials: true });
  }

  constructor(private http: HttpClient) {
  }

  getAllBlogs(): Observable<Array<Blog>> {
    return this.http.get<Array<Blog>>(environment.restUrl + '/blog/getAll')
      .pipe(
        map(data => {
          const posts = new Array<Blog>();
          for (const post of data) {
            posts.push(Blog.fromHttp(post));
          }
          return posts;
        })
      );
  }

  getBlog(id: string): Observable<Blog> {
    return this.http.get<Blog>(environment.restUrl + '/blog/getPost/' + id);
  }
}
