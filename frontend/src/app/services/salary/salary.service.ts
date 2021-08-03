import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Salary } from 'src/app/modules/salary/salary.interface';

@Injectable({
  providedIn: 'root'
})

export class SalaryService {
  baseUrl = 'http://localhost:8000/salaries';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getSalary(id: string): Observable<Salary> {
    return this.http.get<Salary>(`${this.baseUrl}/${id}/`);
  }

  createSalary(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/', data);
  }

  updateSalary(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/`, data);
  }

  deleteSalary(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
