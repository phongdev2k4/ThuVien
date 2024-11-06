package com.bookland.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ChiTietPhieuMuon")
public class ChiTietPhieuMuon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;
 
    @ManyToOne
    @JoinColumn(name = "MaPM", referencedColumnName = "MaPM")
    private PhieuMuon phieuMuon;

    @ManyToOne
    @JoinColumn(name = "MaBanSaoSach", referencedColumnName = "MaBanSaoSach")
    private BanSaoSach banSaoSach;
    
}
