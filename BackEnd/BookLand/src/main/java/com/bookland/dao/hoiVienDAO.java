package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.HoiVien;

public interface hoiVienDAO extends JpaRepository<HoiVien,String> {
	  // Query method to find HoiVien by the associated TaiKhoan's ID
	@Query("SELECT hv FROM HoiVien hv WHERE hv.taiKhoanHV.userName = :userName")
	HoiVien findByTaiKhoanId(@Param("userName") String userName);
	
	  @Query("SELECT h FROM HoiVien h WHERE h.hoTen LIKE %:name%")
	    List<HoiVien> findByHoTenContaining(@Param("name") String name);
	  long count();


}
