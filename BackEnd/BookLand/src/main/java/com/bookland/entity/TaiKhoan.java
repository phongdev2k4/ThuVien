package com.bookland.entity;

import java.util.Date;
import java.util.List;



import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "TaiKhoan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaiKhoan {
    @Id
    @Column(name = "UserName", length = 30)
    private String userName;
    private String password; 
    
    @JsonIgnore
    @OneToOne(mappedBy = "taiKhoanHV", cascade = CascadeType.ALL, optional = true)
    private HoiVien hoiVien;
    
    @JsonIgnore
    @OneToOne(mappedBy = "taiKhoanNV",cascade = CascadeType.ALL)
    private NhanVien nv;
    

//	@JsonIgnore
	@OneToMany(mappedBy = "taiKhoan", fetch = FetchType.EAGER)
	private List<Authority> authorities;
}
