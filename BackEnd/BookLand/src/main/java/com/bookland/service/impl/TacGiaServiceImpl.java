package com.bookland.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.TacGiaDAO;
import com.bookland.entity.TacGia;
import com.bookland.service.TacGiaService;
@Service
public class TacGiaServiceImpl implements TacGiaService {

	@Autowired
	TacGiaDAO tacGiaDao;

	@Override
	public List<TacGia> finAll() {
		List<TacGia> tacGias=tacGiaDao.findAll();
		return tacGias;
	}

	@Override
	public TacGia create(TacGia tacGia) {
		return tacGiaDao.save(tacGia);
	}

	@Override
	public void delete(String matg) {
		tacGiaDao.deleteById(matg);

	}

	@Override
	public TacGia finById(String id) {
		TacGia tacGia=tacGiaDao.findById(id).get();
		return tacGia;
	}


}
