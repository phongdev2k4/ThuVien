package com.bookland.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.MuonOnline;

public interface muonOnlineDao extends JpaRepository< MuonOnline,Integer>{
	List<MuonOnline> findByTinhTrangFalse();
	List<MuonOnline> findByTinhTrangTrue();
	  Optional<MuonOnline> findById(Long id);
}
