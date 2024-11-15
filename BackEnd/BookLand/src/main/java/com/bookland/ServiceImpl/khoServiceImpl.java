package com.bookland.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.KhoDAO;
import com.bookland.entity.Kho;
import com.bookland.service.KhoService;

@Service
public class khoServiceImpl implements KhoService{
    @Autowired
    KhoDAO khoDAO;
	@Override
	public List<Kho> finAll() {
		List<Kho> khos=khoDAO.findAll()
;		return khos;
	}

	@Override
	public Kho create(Kho kho) {
		return khoDAO.save(kho);
	}

	@Override
	public void delete(int makho) {
		khoDAO.deleteById(makho);
		
	}

}
