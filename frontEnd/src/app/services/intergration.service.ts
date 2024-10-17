import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { Observable } from 'rxjs';
import { SignupRequest } from '../models/signup-request';
import { SignupResponse } from '../models/signup-response';

const BASE_URL = "http://localhost:8080/api";
const User_URL = "http://localhost:8080/api/user";

@Injectable({
  providedIn: 'root'
})
export class IntergrationService {
  constructor(private http: HttpClient) { }

  doLogin(request: LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(BASE_URL + "/dangNhap", request);
  }

  // dashboard(): Observable<any> {
  //   return this.http.get<any>(BASE_URL + "/dashboard");
  // }

  doRegister(request: SignupRequest):Observable<SignupResponse> {
    return this.http.post<SignupResponse>(BASE_URL + "/doRegister", request);
  }
  getUserData(userId: string): Observable<any> {
    return this.http.get<any>(`${User_URL}/${userId}`);
  }
}
