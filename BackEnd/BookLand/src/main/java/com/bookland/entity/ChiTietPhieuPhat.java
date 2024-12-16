package com.bookland.entity;

import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity
@Table(name = "ChiTietPhieuPhatSach")
public class ChiTietPhieuPhat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "MaPhieuPhat", referencedColumnName = "MaPhieuPhat", nullable = false)
    private PhieuPhat phieuPhat;
    
    @ManyToOne
    @JoinColumn(name = "MaBanSaoSach", referencedColumnName = "MaBanSaoSach")
    private BanSaoSach banSaoSach;
    

    @Column(name = "LyDo", nullable = false, length = 255,columnDefinition = "nvarchar(100)")
    private String lyDo;

    @Column(name = "SoTienPhat", nullable = false)
    private double soTienPhat;
}
