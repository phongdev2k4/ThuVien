package com.bookland.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.ChucVu;
import com.bookland.entity.TaiKhoan;

public interface chucVuDAO  extends JpaRepository <ChucVu,String>{
	ChucVu findByid(String id);
}
