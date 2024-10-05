package com.bookland.entity;

import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ChiTietSachNhanVien")
public class ChiTietSachNhanVien {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaSachNhanVien")
	private int maSachNhanVien;

    @ManyToOne
    @JoinColumn(name = "MaSach", referencedColumnName = "MaSach")
    private Sach sach;

    @ManyToOne
    @JoinColumn(name = "MaNV", referencedColumnName = "MaNV")
    private NhanVien nhanVien;

	@Column(name = "HanhDong",columnDefinition = "nvarchar(255)")
	private String hanhDong;

	@Column(name = "ThoiGianThucHien", columnDefinition = "datetime default CURRENT_TIMESTAMP")
	private Date thoiGianThucHien;
}
