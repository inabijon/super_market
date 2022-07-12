import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(private http: HttpClient) {}
  getFoodAmount(): Observable<any> {
    return this.http.get<any>('https://supermarket7.herokuapp.com/api/foods/budget');
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>('https://supermarket7.herokuapp.com/api/user');
  }
  get hideHeader() {
    return true;
  }
}
