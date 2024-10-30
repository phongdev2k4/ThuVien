package com.bookland.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "SachTheLoai")
//@IdClass(SachTheLoaiId.class)
public class SachTheLoai {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "MaSach")
	private Sach sach;


	@ManyToOne
	@JoinColumn(name = "MaTheLoai")
	private TheLoai theLoai;

}
