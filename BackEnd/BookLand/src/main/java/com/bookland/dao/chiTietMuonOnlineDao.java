package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookland.entity.BorrowOnlineDetail;

public interface chiTietMuonOnlineDao extends JpaRepository<BorrowOnlineDetail, Integer> {
	@Query("SELECT b FROM BorrowOnlineDetail b WHERE b.borrowOnline.id = :muonOnlineId")
    List<BorrowOnlineDetail> findByMuonOnlineId(Long muonOnlineId);
}
