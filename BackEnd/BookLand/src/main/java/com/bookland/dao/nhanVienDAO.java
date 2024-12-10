package com.bookland.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
		@Query(value = "SELECT MAX(CAST(SUBSTRING(manv, 3, LEN(manv) - 2) AS INT)) "
				+ "FROM nhan_vien WHERE manv LIKE 'nv%'", nativeQuery = true)
		Integer findMaxMaNVNumber();
	    //Phương thức kiểm tra sự tồn tại của email
	    boolean existsByEmail(String email);
	    
	    @Query("SELECT nv FROM NhanVien nv WHERE " +
	    	       "(:keyword IS NULL OR :keyword = '' OR " +
	    	       "LOWER(nv.maNV) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    	       "LOWER(nv.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    	       "LOWER(nv.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    	       "LOWER(nv.soDienThoai) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    	       "LOWER(nv.gioiTinh) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    	       "LOWER(nv.diaChi) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    	       "LOWER(nv.tinhTrang) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
	    	       "LOWER(CAST(nv.ngaySinh AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')))")
	    	Page<NhanVien> searchNhanViens(@Param("keyword") String keyword, Pageable pageable);
}
