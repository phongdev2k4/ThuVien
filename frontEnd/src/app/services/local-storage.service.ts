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
  setIdUser(key:string){
    localStorage.setItem('idUser',key);
  }
  getIdUser(): string {
    // Retrieve the idUser from localStorage
    const idUser = localStorage.getItem('idUser');
    
    // If it's a string, return it directly, or return an empty string if not found
    return idUser ? idUser : '';
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
  setTTNguoiDung(value: any): void {
    localStorage.setItem('TTNguoiDung', JSON.stringify(value));
  }
  getTTNguoiDung():any{
   let ttnguoidung = localStorage.getItem('TTNguoiDung');
   return ttnguoidung ? JSON.parse(ttnguoidung) : null;
  }
  
}
