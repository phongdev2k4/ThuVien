package com.bookland.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "Sach")
public class Sach {
	@Id
	@Column(name = "MaSach", length = 30)
	private String maSach;

	@Column(name = "TenSach", columnDefinition = "nvarchar(255)")
	private String tenSach;

	@Column(name = "NXB", columnDefinition = "nvarchar(255)")
	private String nxb;

	@Column(name = "NamXB")
	private int namXB;
	

    @Column(name = "tienSach")
    private double tienSach;
	
	@ManyToOne
	@JoinColumn(name = "MaTacGia", referencedColumnName = "MaTacGia")
	@ToString.Exclude
	private TacGia tacGia;
	
	

	@Column(name = "MoTa", columnDefinition = "nvarchar(max)")
	private String moTa;
	
    
	@JsonIgnore
    @OneToMany(mappedBy = "sach",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<SachTheLoai> sachTheLoaiList;
	

	@JsonIgnore
    @OneToMany(mappedBy = "sach",cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<hinhAnhSach> hinhAnhSach;
	
	
	@JsonIgnore
    @OneToMany(mappedBy = "sach")
    private List<BanSaoSach> banSaoSachList;
}
