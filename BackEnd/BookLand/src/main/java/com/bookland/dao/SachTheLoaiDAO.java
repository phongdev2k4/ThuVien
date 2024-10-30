package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.SachTheLoai;

public interface SachTheLoaiDAO extends JpaRepository<SachTheLoai, Integer> {
	 @Query("SELECT stl FROM SachTheLoai stl WHERE stl.sach.maSach = :maSach")
	    List<SachTheLoai> findByMaSach(@Param("maSach") String maSach);
}
