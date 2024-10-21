package com.bookland.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.HoiVienDAO;
import com.bookland.entity.HoiVien;
import com.bookland.service.HoiVienService;


@Service
public class HoiVienServiceLmpl implements HoiVienService{
	@Autowired
	HoiVienDAO hoiVienDao;
	@Override
	public List<HoiVien> finAll() {
		List<HoiVien> hoiVien=hoiVienDao.findAll();
		return hoiVien;
	}

	@Override
	public HoiVien create(HoiVien hoiVien) {
		return hoiVienDao.save(hoiVien);
	}

	@Override
	public void delete(String maHV) {
		hoiVienDao.deleteById(maHV);

	}

	@Override
	public HoiVien finById(String id) {
		HoiVien tacGia=hoiVienDao.findById(id).get();
		return tacGia;
	}




}
