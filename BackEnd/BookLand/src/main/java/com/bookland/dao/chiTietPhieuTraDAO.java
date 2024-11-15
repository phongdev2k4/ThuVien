package com.bookland.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.ChiTietPhieuTra;
import com.bookland.entity.PhieuTra;

public interface chiTietPhieuTraDAO extends JpaRepository<ChiTietPhieuTra,Integer> {

}
