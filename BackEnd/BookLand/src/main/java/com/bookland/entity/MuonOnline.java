package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.bookland.entity.BorrowOnlineDetail;
import com.bookland.entity.HoiVien;
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
@Table(name = "muon_online")
public class MuonOnline {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "ngayMuon", nullable = false)
	private Date ngayMuon;

	@Column(name = "ngayHenLay", nullable = false)
	private Date ngayHenLay;

	@Column(name = "tinhTrang")
	private boolean tinhTrang = false;
	
	@Column(name = "tienDatCoc")
	private Double  tienDatCoc;
	
	  @Column(name = "isPickedUp")
	  private boolean isPickedUp = false;

	@OneToMany(mappedBy = "borrowOnline", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BorrowOnlineDetail> details;

	@ManyToOne
	@JoinColumn(name = "MaHV", referencedColumnName = "MaHV")
	private HoiVien hoiVien;

}
