package com.bookland.service;

import java.util.List;

import com.bookland.entity.HoiVien;


public interface HoiVienService {
	public List<HoiVien> finAll();

	public HoiVien finById(String id);

	public HoiVien create(HoiVien hoiVien);

	public void delete(String maHV);
}
