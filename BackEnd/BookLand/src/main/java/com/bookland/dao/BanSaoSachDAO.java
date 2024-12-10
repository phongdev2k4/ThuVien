package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.dto.BanSaoSachWithCoverImageDTO;
import com.bookland.entity.BanSaoSach;


public interface BanSaoSachDAO extends  JpaRepository<BanSaoSach,Integer>{
    @Query("SELECT MAX(b.maBanSaoSach) FROM BanSaoSach b")
    Integer findMaxMaBanSaoSach();
    
    BanSaoSach findByMaVach(String maVach);
    
    BanSaoSach findBanSaoSachByMaBanSaoSach(int maBanSaoSach);
    

    @Query("SELECT COUNT(b) FROM BanSaoSach b WHERE b.sach.maSach = :sachId AND b.trangThaiMuon='Có sẵn'")
    long countBySachIdAndTrangThaiBaoQuan(@Param("sachId") String sachId);
    @Query(value = "SELECT COUNT(*) FROM ban_sao_sach b WHERE b.ma_sach = :maSach AND b.trang_thai_muon = :trangThaiMuon AND b.trang_thai_bao_quan = :trangBaoQuan ", nativeQuery = true)
    long countByMaSachAndTrangThaiMuon(@Param("maSach") String maSach, @Param("trangThaiMuon") String trangThaiMuon,@Param("trangBaoQuan") String trangBaoQuan);
    
    @Query("SELECT COUNT(b) FROM BanSaoSach b WHERE b.trangThaiBaoQuan = :condition")
    Integer countByCondition(@Param("condition") String condition);
    
    @Query("SELECT COUNT(b) FROM BanSaoSach b WHERE b.trangThaiBaoQuan !=:condition")
    long countBooksWithConditionNotMới(@Param("condition") String condition);

    // Count all Sach
    @Query("SELECT COUNT(s) FROM BanSaoSach s")
    long countAllSach();
    @Query("SELECT DISTINCT new com.bookland.dto.BanSaoSachWithCoverImageDTO(s,h.imageUrl, " +
            "(SELECT COUNT(bs) FROM BanSaoSach bs WHERE bs.sach = b.sach AND bs.trangThaiMuon = :trangThaiMuon AND bs.trangThaiBaoQuan = :trangBaoQuan)) " +
            "FROM BanSaoSach b " +
            "JOIN b.sach s " +
            "JOIN s.hinhAnhSach h " +
            "WHERE h.imageType = 'COVER'")
    List<BanSaoSachWithCoverImageDTO> findSachByBanSaoSachWithCoverImage(@Param("trangThaiMuon") String trangThaiMuon, @Param("trangBaoQuan") String trangBaoQuan);
    
    @Query("SELECT bs FROM BanSaoSach bs " +
    	       "JOIN bs.sach s " +
    	       "WHERE s.id = :sachId " +
    	       "AND bs.trangThaiMuon = :trangThaiMuon " +
    	       "AND bs.trangThaiBaoQuan = :trangBaoQuan")
    	List<BanSaoSach> findBanSaoSachBySachId(@Param("sachId") String sachId,@Param("trangThaiMuon") String trangThaiMuon, @Param("trangBaoQuan") String trangBaoQuan);
}
