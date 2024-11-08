package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.bookland.entity.Sach;
import com.bookland.entity.SachTheLoai;
import com.bookland.entity.SachTheLoai.SachTheLoaiKey;
import com.bookland.entity.TheLoai;

public interface SachTheLoaiDAO extends JpaRepository<SachTheLoai, SachTheLoaiKey>{
	@Query("SELECT st.theLoai FROM SachTheLoai st WHERE st.sach = :sach")
	List<TheLoai> findBySach(@Param("sach") Sach sach);
	
    @Modifying
    @Transactional
    @Query("DELETE FROM SachTheLoai st WHERE st.sach.maSach = :maSach")
    void deleteBySach_MaSach(String maSach);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM SachTheLoai st WHERE st.sach.maSach = :maSach AND st.theLoai.maTheLoai = :maTheLoai")
    void deleteBySachMaSachAndTheLoaiMaTheLoai(@Param("maSach") String maSach, @Param("maTheLoai") String maTheLoai);
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO sach_the_loai (MaSach, ma_sach, MaTheLoai, ma_the_loai) VALUES (:maSach, :maSach, :maTheLoai, :maTheLoai)", nativeQuery = true)
    void insertSachTheLoai(@Param("maSach") String maSach, @Param("maTheLoai") String maTheLoai);
}
