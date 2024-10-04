package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "PhieuTra")
public class PhieuTra {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaPT")
	private int maPT;

    @ManyToOne
    @JoinColumn(name = "MaPM", referencedColumnName = "MaPM")
    private PhieuMuon phieuMuon;

    @ManyToOne
    @JoinColumn(name = "MaHV", referencedColumnName = "MaHV")
    private HoiVien hoiVien;

    @ManyToOne
    @JoinColumn(name = "MaNV", referencedColumnName = "MaNV")
    private NhanVien nhanVien;

	@Column(name = "NgayLapPhieuTra")
	private Date ngayLapPhieuTra;
    
	@JsonIgnore
	@OneToMany(mappedBy = "phieuTra")
	private List<PhieuPhat> phieuPhatList;
	
	@JsonIgnore
    @OneToMany(mappedBy = "phieuTra")
    private List<ChiTietPhieuTra> chiTietPhieuTraList;
}
