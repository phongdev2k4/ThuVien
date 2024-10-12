package com.bookland.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "TacGia")
public class TacGia {
	@Id
	@Column(name = "MaTacGia", length = 30)
	@NotBlank(message = "Mã tác giả không được để trống")
	private String maTacGia;

	@Column(name = "TenTacGia",columnDefinition = "nvarchar(150)")
	@NotBlank(message = "Tên tác giả không được để trống")
	private String tenTacGia;

	@Column(name = "NgaySinh" )
	@Temporal(TemporalType.DATE) 
	@NotNull(message = "Ngày sinh không được để trống") 
	private Date ngaySinh;

	@Column(name = "QuocGia",columnDefinition = "nvarchar(150)")
	 @NotBlank(message = "Quốc gia không được để trống")
	private String quocGia;
	
	@JsonIgnore
    @OneToMany(mappedBy = "tacGia")
    private List<Sach> sachList;
}
