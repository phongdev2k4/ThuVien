package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.ChiTietPhieuMuon;

public interface chiTietPhieuMuonDao extends JpaRepository<ChiTietPhieuMuon,Integer>{
//	 @Query("SELECT ct FROM ChiTietPhieuMuon ct WHERE ct.phieuMuon.maPM = :maPM")
//	    List<ChiTietPhieuMuon> findAllByPhieuMuonId(@Param("maPM") int maPM);
		
		  @Query("SELECT ct FROM ChiTietPhieuMuon ct WHERE ct.phieuMuon.maPM IN :maPMList")
		    List<ChiTietPhieuMuon> findAllByPhieuMuonIds(@Param("maPMList") List<Integer> maPMList);
		  
		  @Query("SELECT c FROM ChiTietPhieuMuon c WHERE c.banSaoSach.maBanSaoSach = :banSaoSachId AND c.isReturned = false")
		  List<ChiTietPhieuMuon> findByBanSaoSachId(@Param("banSaoSachId") int banSaoSachId);
		  
		  @Query(value = "SELECT * FROM chi_tiet_phieu_muon c " +
                  "WHERE c.ma_ban_sao_sach = ?1 " +
                  "AND c.mapm NOT IN (SELECT pt.mapm FROM phieu_tra pt)", 
          nativeQuery = true)
   List<ChiTietPhieuMuon> findByBanSaoSachIdAndNotInPhieuTra(int banSaoSachId);

}
