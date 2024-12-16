package com.bookland.entity;


import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "chi_tiet_muon_online")
public class BorrowOnlineDetail {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	
    @ManyToOne
    @JoinColumn(name = "borrow_online_id", nullable = false)
    @JsonIgnore 
    private MuonOnline borrowOnline;

    
    @ManyToOne
    @JoinColumn(name = "MaBanSaoSach", referencedColumnName = "MaBanSaoSach")
    private BanSaoSach banSaoSach;

 


}
