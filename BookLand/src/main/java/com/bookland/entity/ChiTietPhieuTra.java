package com.bookland.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ChiTietPhieuTra")
public class ChiTietPhieuTra {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @ManyToOne
    @JoinColumn(name = "MaPT", referencedColumnName = "MaPT")
    private PhieuTra phieuTra;

    @ManyToOne
    @JoinColumn(name = "MaBanSaoSach", referencedColumnName = "MaBanSaoSach")
    private BanSaoSach banSaoSach;

}
