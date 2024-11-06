package com.bookland.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "TheLoai")
public class TheLoai {
	@Id
	@Column(name = "MaTheLoai", length = 30)
	private String maTheLoai;

	@Column(name = "TenTheLoai",columnDefinition = "nvarchar(150)")
	private String tenTheLoai;

	@Column(name = "MoTa", columnDefinition = "nvarchar(max)")
	private String moTa;
	
}
