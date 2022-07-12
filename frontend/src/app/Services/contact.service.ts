import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../Models/contact';
import { Observable } from 'rxjs';

const BACKEND_URL = 'https://supermarket7.herokuapp.com/api/';
@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) { }

  getMessageFromUsers() {
    return this.http.get<{ message: Contact }>(BACKEND_URL + 'contact-us')
  }
  sendMessageToAdmin(message: any) {
    return this.http.post(BACKEND_URL + 'contact-us', message)
  }
  deleteUsersMessage(message: string) {
    return this.http.delete(BACKEND_URL + 'contact-us' + '/' + message)
  }

}
