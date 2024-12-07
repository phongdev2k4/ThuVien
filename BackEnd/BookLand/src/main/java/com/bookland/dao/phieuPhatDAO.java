package com.bookland.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.PhieuMuon;
import com.bookland.entity.PhieuPhat;

public interface phieuPhatDAO extends JpaRepository <PhieuPhat,Integer> {

}
