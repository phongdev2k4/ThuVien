package com.bookland.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Kho")
public class Kho {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MaKho")
	private int maKho;

	@Column(name = "TenKho",columnDefinition = "nvarchar(255)")
	private String tenKho;

	@Column(name = "DiaDiem",columnDefinition = "nvarchar(255)")
	private String diaDiem;
	
	@JsonIgnore 
    @OneToMany(mappedBy = "kho")
    private List<BanSaoSach> banSaoSachList;
}
