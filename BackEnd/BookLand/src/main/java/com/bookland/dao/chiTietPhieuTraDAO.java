package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.ChiTietPhieuTra;

public interface chiTietPhieuTraDAO extends JpaRepository<ChiTietPhieuTra,Integer> {
	 @Query("SELECT ct FROM ChiTietPhieuTra ct WHERE ct.phieuTra.maPT = :maPT")
    List<ChiTietPhieuTra> findAllByPhieuTraId(@Param("maPT") int maPT);
}
