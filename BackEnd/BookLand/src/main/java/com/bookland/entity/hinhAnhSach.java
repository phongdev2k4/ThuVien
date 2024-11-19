package com.bookland.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Entity
@Table(name = "hinhAnhSach")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class hinhAnhSach {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long  id;
	private String name;
	private String imageUrl;
	private String imageId;
	// COVER, BACKSIDE, FRONTSIDE
	private String imageType;


	public hinhAnhSach(String name, String imageUrl, String imageId,Sach sach) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.imageId = imageId;
		this.sach =sach;
	}
	
	@ManyToOne
	@JoinColumn(name = "MaSach", referencedColumnName = "MaSach")
	private Sach sach;
}
