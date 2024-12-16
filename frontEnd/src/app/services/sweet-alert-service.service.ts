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
  confirm(message: string): Promise<boolean> {
    return Swal.fire({
      title: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => result.isConfirmed);
  }

  loading(message: string): any {
    return Swal.fire({
      title: message,
      html: 'Vui lòng đợi...',
      allowOutsideClick: false, // Không cho phép đóng modal bằng cách click ngoài
      didOpen: () => {
        Swal.showLoading(); // Hiển thị loading spinner
      }
    });
  }
    // Đóng màn hình chờ
    closeLoading(): void {
      Swal.close(); // Đóng modal
    }

      // Hiển thị màn hình chờ khi đang cập nhật
    
    
     

}
