package com.bookland.entity;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "HoiVien")
public class HoiVien {
	@Id
    @Column(name = "MaHV", length = 30)
    private String maHV;

    @Column(name = "Email", length = 255, unique = true)
    private String email;

    @Column(name = "SoDienThoai", length = 20)
    private String soDienThoai;

    @Column(name = "MatKhau", length = 100, nullable = false)
    private String matKhau;

    @Column(name = "HoTen",  columnDefinition = "nvarchar(150)")
    private String hoTen;

    @Column(name = "DiaChi",  columnDefinition = "nvarchar(255)")
    private String diaChi;

    @Column(name = "ThoiGianDangKy", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date thoiGianDangKy;

    @Column(name = "TinhTrang")
    private boolean tinhTrang;

    @Column(name = "TienNap")
    private double tienNap;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "hoiVien")
    private List<PhieuMuon> phieuMuonList;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "hoiVien")
    private List<PhieuPhat> phieuPhatList;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "hoiVien")
    private List<PhieuTra> phieuTraList;
}
