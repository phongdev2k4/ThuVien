package com.bookland.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "ChucVu")
public class ChucVu {
	@Id
	@Column(name = "MaCV", length = 30)
	private String maCV;

	@Column(name = "TenChucVu", columnDefinition = "nvarchar(100)")
	private String tenChucVu;
    
	@JsonIgnore
    @OneToMany(mappedBy = "chucVu")
    private List<NhanVien> nhanVienList;
}
