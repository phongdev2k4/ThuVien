package com.bookland.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.SachDAO;
import com.bookland.entity.Sach;
import com.bookland.service.SachService;

@Service
public class SachServiceLmpl implements SachService{
    
	@Autowired
	SachDAO sachDAO;
	
	@Override
	public List<Sach> finAll() {
		List<Sach> sachs=sachDAO.findAll();
		return sachs;
	}

	@Override
	public Sach create(Sach sach) {
		return sachDAO.save(sach);
	}

	@Override
	public void delete(String masach) {
		sachDAO.deleteById(masach);
		
	}

}
