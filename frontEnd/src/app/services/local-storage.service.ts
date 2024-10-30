import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  set(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
  public setRoles(roles: string[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  
  public getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : []; // Handle null case by returning an empty array
  }
  public clear() {
    localStorage.clear();
  }

  
}
