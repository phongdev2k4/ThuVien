package com.bookland.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	@JsonIgnore
    @OneToMany(mappedBy = "theLoai")
    private List<SachTheLoai> sachTheLoaiList;
}
