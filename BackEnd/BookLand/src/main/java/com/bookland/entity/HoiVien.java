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
@Table(name = "HoiVien")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoiVien {
	@Id
    @Column(name = "MaHV", length = 30)
    private String maHV;	 
    @Column(name = "Email", length = 255, unique = true)
    private String email;

    @Column(name = "SoDienThoai", length = 20)
    private String soDienThoai;

    @Column(name = "HoTen", columnDefinition = "nvarchar(150)")
    private String hoTen;

    @Column(name = "DiaChi", columnDefinition = "nvarchar(255)")
    private String diaChi;

    @Column(name = "ThoiGianDangky", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    private Date thoiGianDangKy;

    @Column(name = "TinhTrang")
    private boolean tinhTrang;

    @Column(name = "TienNap")
    private double tienNap;
    
    @OneToOne
    @JoinColumn(name = "account_id",nullable =false, unique = true)
    private TaiKhoan taiKhoanHV;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "hoiVien",cascade = CascadeType.ALL)
    private List<PhieuMuon> phieuMuonList;
    @JsonIgnore 
    @OneToMany(mappedBy = "hoiVien")
    private List<PhieuPhat> phieuPhatList;
    
    @JsonIgnore 
    @OneToMany(mappedBy = "hoiVien")
    private List<PhieuTra> phieuTraList;
    
    
   
    
  
}
