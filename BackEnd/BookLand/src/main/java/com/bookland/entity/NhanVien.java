package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Table(name = "NhanVien")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {
    @Id
    @Column(name = "MaNV", length = 30)
    private String maNV;

    @Column(name = "Email", length = 255)
    private String email;


    @Column(name = "HoTen", columnDefinition = "nvarchar(150)")
    private String hoTen;

    @Column(name = "SoDienThoai", length = 20)
    private String soDienThoai;

    @Column(name = "GioiTinh", columnDefinition = "nvarchar(10)")
    private String gioiTinh;

    @Column(name = "DiaChi", columnDefinition = "nvarchar(255)")
    private String diaChi;

    @Column(name = "NgaySinh")
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    @Column(name = "TinhTrang", columnDefinition = "nvarchar(20)  " )
    private String tinhTrang ;
    

    @Column(name = "HinhAnhNV", columnDefinition = "nvarchar(255)")
    private String hinhAnhNV;
    
    @OneToOne
    @JoinColumn(name = "account_id")
    private TaiKhoan taiKhoanNV;
    
    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<PhieuMuon> phieuMuonList;
    
    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<PhieuPhat> phieuPhatList;
    
    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<PhieuTra> phieuTraList;

    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien") // Liên kết với bảng ThanhToan
    private List<ThanhToan> thanhToans; // Danh sách thanh toán của nhân viên
   
    
 
}
