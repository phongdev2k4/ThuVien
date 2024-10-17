package com.bookland.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookland.entity.TheLoai;


public interface TheLoaiService {
	public List<TheLoai> finAll();
	public TheLoai create(TheLoai theloai);
	public void delete(String matheloai);
}
