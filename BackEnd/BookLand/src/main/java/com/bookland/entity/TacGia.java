package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity
@Table(name = "TacGia")
public class TacGia {
	@Id
	@Column(name = "MaTacGia", length = 30)
	private String maTacGia;

	@Column(name = "TenTacGia",columnDefinition = "nvarchar(150)")
	private String tenTacGia;

	@Column(name = "NgaySinh")
	private Date ngaySinh;

	@Column(name = "QuocGia",columnDefinition = "nvarchar(150)")
	private String quocGia;
	
	@JsonIgnore
    @OneToMany(mappedBy = "tacGia",cascade = CascadeType.ALL)
	@ToString.Exclude
    private List<Sach> sachList;
}
