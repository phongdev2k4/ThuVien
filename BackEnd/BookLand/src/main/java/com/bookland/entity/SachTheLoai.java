package com.bookland.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "SachTheLoai")
//@IdClass(SachTheLoaiId.class)
public class SachTheLoai {
	@Id
	@ManyToOne
	@JoinColumn(name = "MaSach")
	private Sach sach;

	@Id
	@ManyToOne
	@JoinColumn(name = "MaTheLoai")
	private TheLoai theLoai;

}
