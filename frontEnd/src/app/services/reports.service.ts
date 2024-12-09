import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BorrowReport } from '../models/borrow-report';
import { MostBorrowedBook } from '../models/most-borrowed-book';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'http://localhost:8080/report';


  constructor(private http: HttpClient) {}


  getBorrowReports(): Observable<BorrowReport[]> {
    return this.http.get<BorrowReport[]>(`${this.apiUrl}/borrowed`);
  }

  getConditionReport(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/condition-status`);
  }

  getTop5MostBorrowedBooks(): Observable<MostBorrowedBook[]> {
    return this.http.get<MostBorrowedBook[]>(`${this.apiUrl}/most-borrowed`);
  }

  getReportCounts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/counts`);
  }
  getYearlyReport(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/yearly?year=${year}`);
  }
  
  getMonthlyReport(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/monthly?year=${year}`);
  }
  
  getWeeklyReport(year: number, month: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/daily?year=${year}&month=${month}`);
  }
  getBorrowingTrendsByGenre(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/borrowing-trends-by-genre`);
  }
  getInventoryHealthReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory-health`);
  }
  getHighDemandBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/high-demand-books`);
  }
}
