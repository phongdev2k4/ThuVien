package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PhieuMuon")
public class PhieuMuon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaPM")
	private int maPM;

    @ManyToOne
    @JoinColumn(name = "MaHV", referencedColumnName = "MaHV")
    private HoiVien hoiVien;

    @ManyToOne
    @JoinColumn(name = "MaNV", referencedColumnName = "MaNV")
    private NhanVien nhanVien;

	@Column(name = "HanTraSach")
	private Date hanTraSach;

	@Column(name = "NgayLapPhieu")
	private Date ngayLapPhieu;
	
	@JsonIgnore
    @OneToMany(mappedBy = "phieuMuon")
    private List<ChiTietPhieuMuon> chiTietPhieuMuonList;
    
	@JsonIgnore
    @OneToMany(mappedBy = "phieuMuon")
    private List<PhieuTra> phieuTraList;
}
