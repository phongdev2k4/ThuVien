package com.bookland.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.TacGia;

public interface TacGiaDAO extends JpaRepository<TacGia, String> {
	TacGia findByMaTacGia(String maTacGia);
 
}
