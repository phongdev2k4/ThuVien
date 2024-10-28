package com.bookland.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookland.entity.BanSaoSach;


public interface BanSaoSachDAO extends  JpaRepository<BanSaoSach,Integer>{
    @Query("SELECT MAX(b.maBanSaoSach) FROM BanSaoSach b")
    Integer findMaxMaBanSaoSach();
    
    BanSaoSach findByMaVach(String maVach);
}
