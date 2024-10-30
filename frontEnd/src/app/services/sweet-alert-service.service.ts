import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertServiceService {
  success(message: string, callback?: () => void): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      if (callback) callback(); // Execute callback after user confirms
    });
  }
  error(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  // Warning notification
  warning(message: string): void {
    Swal.fire({
      title: 'Warning!',
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }
}
