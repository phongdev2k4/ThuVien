package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "NhanVien")
public class NhanVien {
    @Id
    @Column(name = "MaNV", length = 30)
    private String maNV;

    @Column(name = "Email", length = 255, unique = true)
    private String email;

    @Column(name = "MatKhau", length = 100, nullable = false)
    private String matKhau;

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

    @Column(name = "TinhTrang", columnDefinition = "nvarchar(20) " )
    private String tinhTrang ;
    
    @ManyToOne
    @JoinColumn(name = "ChucVu", referencedColumnName = "MaCV")
    private ChucVu chucVu;

    @Column(name = "HinhAnhNV", columnDefinition = "nvarchar(255)")
    private String hinhAnhNV;
    
    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<ChiTietSachNhanVien> chiTietSachNhanVienList;
    
    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<PhieuMuon> phieuMuonList;
    
    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<PhieuPhat> phieuPhatList;
    
    @JsonIgnore
    @OneToMany(mappedBy = "nhanVien")
    private List<PhieuTra> phieuTraList;
}
