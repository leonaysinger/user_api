import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/user/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = 'http://localhost:8000';
  basicUsersUrl = `${this.baseUrl}/users`;
  specificUsersUrl = `${this.baseUrl}/user`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.basicUsersUrl);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.basicUsersUrl}/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.basicUsersUrl + '/', data );
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${this.basicUsersUrl}/${id}/`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.basicUsersUrl}/${id}`);
  }

  userMean(cpf: string): Observable<any> {
    return this.http.get(`${this.specificUsersUrl}/${cpf}/salaries`);
  }

  userDiscountMean(cpf: string): Observable<any> {
    return this.http.get(`${this.specificUsersUrl}/${cpf}/discount`);
  } 

  userMaxSalary(cpf: string): Observable<any> {
    return this.http.get(`${this.specificUsersUrl}/${cpf}/maxsalary`);
  }

  userMinSalary(cpf: string): Observable<any> {
    return this.http.get(`${this.specificUsersUrl}/${cpf}/minsalary`);
  }
}
