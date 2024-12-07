package com.bookland.entity;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PhieuPhat")
public class PhieuPhat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaPhieuPhat")
	private int maPhieuPhat;

    @ManyToOne
    @JoinColumn(name = "MaHV", referencedColumnName = "MaHV")
    private HoiVien hoiVien;

    @ManyToOne
    @JoinColumn(name = "MaPT", referencedColumnName = "MaPT")
    private PhieuTra phieuTra;
    
    @Column(name = "NgayLapPhieu")
    @Temporal(TemporalType.DATE)
	private Date ngayLapPhieu;
    
    @Column(name = "soNgayQuaHan")
    private int soNgayQuaHan;

    @Column(name = "TienPhat")
    private double tienPhat;
    
    @Column(name = "viPhamPhieuTra", columnDefinition = "nvarchar(150)")
    private String viPhamPhieuTra;
    
    @ManyToOne
    @JoinColumn(name = "MaNV", referencedColumnName = "MaNV")
    private NhanVien nhanVien;


}
