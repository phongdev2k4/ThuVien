package com.bookland.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.MuonOnline;

public interface muonOnlineDao extends JpaRepository<MuonOnline, Integer> {
	List<MuonOnline> findByTinhTrangFalseAndIsPickedUpTrue();

	List<MuonOnline> findByTinhTrangFalseAndIsPickedUpFalse();

	List<MuonOnline> findByTinhTrangTrue();

	Optional<MuonOnline> findById(Long id);
	
	@Query(value = "SELECT * FROM muon_online mo WHERE mo.mahv = :maHV AND mo.ngay_muon >= CAST(GETDATE() AS DATE) AND mo.ngay_muon < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))", nativeQuery = true)
    List<MuonOnline> findBorrowedTodayByUser(@Param("maHV") String maHV);
	
	 @Query(value = "SELECT COUNT(*) FROM muon_online mo WHERE mo.mahv = :maHV AND mo.ngay_muon  >= CAST(GETDATE() AS DATE) AND mo.ngay_muon  < DATEADD(DAY, 1, CAST(GETDATE() AS DATE))", nativeQuery = true)
	    long countBorrowedTodayByUser(@Param("maHV") String maHV);



}
