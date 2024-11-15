package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.bookland.service.hoiVienService;
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

	@Column(name = "HanTraSach")
	private Date hanTraSach;

	@Column(name = "NgayLapPhieu")
	private Date ngayLapPhieu;

	@ManyToOne
	@JoinColumn(name = "MaHV", referencedColumnName = "MaHV")
	private HoiVien hoiVien;

	@ManyToOne
	@JoinColumn(name = "MaNV", referencedColumnName = "MaNV")
	private NhanVien nhanVien;

}
