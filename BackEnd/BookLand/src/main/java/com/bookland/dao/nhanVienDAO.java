package com.bookland.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.HoiVien;
import com.bookland.entity.hinhAnhSach;

import  com.bookland.entity.NhanVien;

public interface nhanVienDAO extends JpaRepository<NhanVien, String> {
	  // Query method to find HoiVien by the associated TaiKhoan's ID
		@Query("SELECT nv FROM NhanVien nv WHERE nv.taiKhoanNV.userName = :userName")
		NhanVien findByTaiKhoanId(@Param("userName") String userName);

}
