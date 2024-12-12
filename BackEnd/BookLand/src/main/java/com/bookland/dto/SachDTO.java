package com.bookland.dto;

import java.util.Arrays;
import java.util.List;

import com.bookland.entity.TacGia;
import com.bookland.entity.hinhAnhSach;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SachDTO {
 private String maSach;
 private String tenSach;
 private String nxb;
 private int namXB;
 private double tienSach;
 private String moTa;
 private TacGia tacGia;
 private List<TheLoais> theloai;
 private HinhAnhSach hinhAnhSach;  // Đối tượng chứa các phần hình ảnh
 private int tongSoBanCung;
 private int  soBanCungCon;
 @Data
 public static class TheLoais {
     private String maTheLoai;
     private String tenTheLoai;
     private String moTa;
 }
 // Lớp con chứa các phần hình ảnh
 @Data
 public static class HinhAnhSach {
     private HinhAnh frontside;  // Hình ảnh mặt trước
     private HinhAnh cover;     // Hình ảnh bìa
     private HinhAnh backside;  // Hình ảnh mặt sau
 }

 // Lớp đại diện cho mỗi phần hình ảnh (bao gồm url và thông tin)
 @Data
 public static class HinhAnh {
     private String imageUrl;    // URL của hình ảnh
     private String imageDescription; // Mô tả hoặc tên của hình ảnh (nếu cần)
 }
}
