package com.bookland.entity;

import java.math.BigDecimal;

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

	@Column(name = "soNgayQuaHan")
	private int soNgayQuaHan;

    @Column(name = "TienPhat")
    private double tienPhat;
    
    @ManyToOne
    @JoinColumn(name = "MaNV", referencedColumnName = "MaNV")
    private NhanVien nhanVien;


}
