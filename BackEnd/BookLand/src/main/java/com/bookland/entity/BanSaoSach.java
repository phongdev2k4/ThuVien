package com.bookland.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "BanSaoSach")
public class BanSaoSach {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaBanSaoSach")
	private int maBanSaoSach;
     
	@ManyToOne
	@JoinColumn(name = "MaSach", referencedColumnName = "MaSach")
	private Sach sach;
	
    @Column(name = "MaVach", unique = true, nullable = false ,columnDefinition = "varchar(12)")
    private String maVach; 
    
    @Column(name = "HinhAnhMaVach", columnDefinition = "nvarchar(255)")
    private String hinhAnhMaVach; 
    
	@ManyToOne
	@JoinColumn(name = "MaKho", referencedColumnName = "MaKho")
	private Kho kho;

	@Column(name = "TrangThaiMuon", columnDefinition = "nvarchar(100)")
	private String trangThaiMuon;

	@Column(name = "TrangThaiBaoQuan", columnDefinition = "nvarchar(100)")
	private String trangThaiBaoQuan;
    
	@JsonIgnore 
	@OneToMany(mappedBy = "banSaoSach")
	private List<ChiTietPhieuMuon> chiTietPhieuMuonList;
	
	@JsonIgnore 
	@OneToMany(mappedBy = "banSaoSach")
	private List<ChiTietPhieuPhat> chiTietPhieuPhatList;
	
	@JsonIgnore 
    @OneToMany(mappedBy = "banSaoSach")
    private List<ChiTietPhieuTra> chiTietPhieuTraList;
	
	@JsonIgnore 
	@OneToMany(mappedBy = "banSaoSach")
	private List<BorrowOnlineDetail> chiTietMuonOnlineList;
	
	@Transient // This makes JPA ignore the field
	private long soLuong123;
	
}
