import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { Sach } from '../models/sach.model';
import { AddBookRes } from '../models/add-book-res';
import { BookDTO } from '../models/book-dto';


@Injectable({
  providedIn: 'root'
})
export class SachService {
  private apiUrl = 'http://localhost:8080/rest/sach';
  constructor(private http: HttpClient) { }
  sach: BookDTO = new BookDTO();


  // addSach(request:BookDTO,images: File[]): Observable<AddBookRes> {
  //   const formData = new FormData();
  //   images.forEach((image) => formData.append('files', image));
  //   return this.http.post<AddBookRes>(this.apiUrl,request,formData);
  // }
  addSach(request: BookDTO, images: File[]): Observable<AddBookRes> {
    const formData = new FormData();

    // Add metadata fields to FormData
    formData.append('book', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    // Add each image to FormData
    images.forEach((image) => formData.append('files', image));

    // Send the multipart request
    return this.http.post<AddBookRes>(this.apiUrl, formData);
  }
  findAll(): Observable<AddBookRes[]> {
    return this.http.get<AddBookRes[]>(this.apiUrl);
  }
  deleteSach(maSach: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${maSach}`);
  }
  findBooksByName(name: string): Observable<AddBookRes[]> {
    return this.http.get<AddBookRes[]>(`${this.apiUrl}/searchByName?tenSach=${encodeURIComponent(name)}`);
  }
  // getCoverImages(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/cover`);
  // }
  getCoverImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cover`).pipe(
      timeout(5000), // Set a 5-second timeout
      catchError((error) => {
        console.error('Error fetching cover images:', error);
        return throwError(() => error);
      })
    );
  }
}
