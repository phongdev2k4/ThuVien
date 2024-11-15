package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.PhieuMuon;

public interface phieuMuonDAO extends JpaRepository <PhieuMuon,Integer> {
	@Query("SELECT pm.maPM FROM PhieuMuon pm WHERE pm.hoiVien.maHV = :maHV")
    List<Integer> findIdPhieuMuonByHoiVienMaHV(String maHV);
	

    @Query("SELECT pm FROM PhieuMuon pm " +
           "WHERE pm.maPM IN (SELECT ctp.phieuMuon.maPM FROM ChiTietPhieuMuon ctp WHERE ctp.banSaoSach.maBanSaoSach = :maBanSaoSach AND ctp.isReturned = false) " +
           "AND pm.hoiVien.maHV = :maHV ")
    List<PhieuMuon> findByMaBanSaoSachAndMaHV(@Param("maBanSaoSach") Integer maBanSaoSach, @Param("maHV") String maHV);
}
