package com.bookland.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.DAO.SachDAO;
import com.bookland.Service.SachService;
import com.bookland.entity.Sach;


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