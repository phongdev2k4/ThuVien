package com.bookland.entity;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Table(name = "ThanhToan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThanhToan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; // Khóa chính
    
    @Column(name = "MaGiaoDich", unique = true, length = 150)
    private String maGiaoDich; 
    
    @Column(name = "TrangThaiThanhToan", columnDefinition = "nvarchar(150)")
    private String trangThaiThanhToan; // Trạng thái thanh toán (TỰ ĐỘNG / THỦ CÔNG)
    
    @Column(name = "LoaiThanhToan", columnDefinition = "nvarchar(150)")
    private String loaiThanhToan; // Loại thanh toán: "NAP_TIEN", "RUT_TIEN", "TRU_TIEN"
     
    @Column(name = "SoTien")
    private Double soTien; // Số tiền thanh toán

    @Column(name = "ThoiGianThanhToan", columnDefinition = "datetime")
    private Date thoiGianThanhToan; // Thời gian thanh toán (chỉ cần một trường này)

    @Column(name = "HinhThucThanhToan", columnDefinition = "nvarchar(150)")
    private String hinhThucThanhToan; // Phương thức thanh toán (TIEN_MAT, CHUYEN_KHOAN, ATM, THE_TIN_DUNG, VI_DIEN_TU)

    @Column(name = "CongThanhToan", columnDefinition = "nvarchar(150)")
    private String congThanhToan; // Cổng thanh toán (VNPay, MoMo, ZaloPay, PayPal...)


    @Column(name = "TrangThaiGiaoDich", columnDefinition = "nvarchar(150)")
    private String trangThaiGiaoDich; // Trạng thái giao dịch thanh toán (THANH_CONG, THAT_BAI, CHO_XU_LY)
    
    @Column(name = "GhiChu", columnDefinition = "nvarchar(max)")
    private String ghiChu; // Ghi chú (nếu có)
    
    @Column(name = "URlThanhToan", columnDefinition = "nvarchar(max)")
    private String URlThanhToan; // Link thanh toán
    
    @ManyToOne
    @JoinColumn(name = "MaHV", nullable = false) // Khóa ngoại với bảng Hội viên
    private HoiVien hoiVien;

    @ManyToOne
    @JoinColumn(name = "MaNV") // Khóa ngoại với bảng Nhân viên
    private NhanVien nhanVien; // Nhân viên xử lý thanh toán
}
