package com.bookland.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.ThanhToan;

public interface ThanhToanDAO extends JpaRepository<ThanhToan, Integer>{
	 Optional<ThanhToan> findByMaGiaoDich(String maGiaoDich);
	 
	 List<ThanhToan> findByTrangThaiGiaoDich(String trangThaiGiaoDich);
	 
	 Page<ThanhToan> findByHoiVien_MaHVOrderByThoiGianThanhToanDesc(String maHV,Pageable pageable);
}
