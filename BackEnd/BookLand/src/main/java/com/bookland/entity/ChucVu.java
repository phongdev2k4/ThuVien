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
	private String id;
	private String tenChucVu;
	@JsonIgnore
	@OneToMany(mappedBy = "chucVu")
	List<Authority> authorities;
}
