package com.bookland.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

		Optional<HoiVien> findByTaiKhoanHV_UserName(String userName);

		@Query(value = "SELECT MAX(CAST(SUBSTRING(mahv, 3, LEN(mahv) - 2) AS INT)) "
				+ "FROM hoi_vien WHERE mahv LIKE 'hv%'", nativeQuery = true)
		Integer findMaxMaHVNumber();
		
		@Query("SELECT hv FROM HoiVien hv WHERE " +
			       "(:keyword IS NULL OR :keyword = '' OR " +
			       "LOWER(hv.maHV) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			       "LOWER(hv.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			       "LOWER(hv.soDienThoai) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			       "LOWER(hv.hoTen) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			       "LOWER(hv.diaChi) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			       "LOWER(CAST(hv.thoiGianDangKy AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			       "LOWER(CAST(hv.tienNap AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
			       "LOWER(CAST(hv.tinhTrang AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')))")
			Page<HoiVien> searchHoiViens(@Param("keyword") String keyword, Pageable pageable);
}
