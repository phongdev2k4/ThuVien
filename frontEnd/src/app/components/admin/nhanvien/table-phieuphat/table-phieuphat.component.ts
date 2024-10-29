import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsideComponent } from "../../aside/aside.component";

@Component({
  selector: 'app-table-phieuphat',
  standalone: true,
  imports: [AsideComponent,FormsModule,CommonModule,RouterLink],
  templateUrl: './table-phieuphat.component.html',
  styleUrl: './table-phieuphat.component.css'
})
export class TablePhieuphatComponent {
  phieuPhatList: any[] = [];  // Danh sách phiếu phạt

  // constructor(private phieuPhatService: PhieuPhatService) { }

  ngOnInit() {
    this.getPhieuPhatList();  // Lấy danh sách phiếu phạt khi component khởi tạo
  }

  getPhieuPhatList() {
    // // Giả lập gọi API hoặc service để lấy dữ liệu
    // this.phieuPhatService.getPhieuPhatList().subscribe((data: any[]) => {
    //   this.phieuPhatList = data;
    // });
  }

  editPhieuPhat(phieuPhat: any) {
    // Xử lý logic khi bấm nút sửa (chuyển tới form sửa hoặc mở modal)
    console.log('Chỉnh sửa phiếu phạt:', phieuPhat);
  }

  deletePhieuPhat(maPhieuPhat: number) {
    // Xử lý logic khi bấm nút xóa (gọi API để xóa và cập nhật lại danh sách)
    // console.log('Xóa phiếu phạt có mã:', maPhieuPhat);
    // this.phieuPhatService.deletePhieuPhat(maPhieuPhat).subscribe(() => {
    //   this.getPhieuPhatList();  // Cập nhật lại danh sách sau khi xóa
    // });
  }
}
