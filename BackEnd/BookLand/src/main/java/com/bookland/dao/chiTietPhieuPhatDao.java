package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.ChiTietPhieuPhat;


public interface  chiTietPhieuPhatDao  extends JpaRepository<ChiTietPhieuPhat,Integer> {
	 @Query("SELECT ct FROM ChiTietPhieuPhat ct WHERE ct.phieuPhat.maPhieuPhat = :maPP")
	    List<ChiTietPhieuPhat> findAllByPhieuPhatId(@Param("maPP") int maPP);
}
