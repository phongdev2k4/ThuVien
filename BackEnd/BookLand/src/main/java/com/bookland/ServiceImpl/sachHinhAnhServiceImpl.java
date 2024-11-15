package com.bookland.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.hinhAnhSachDAO;
import com.bookland.entity.hinhAnhSach;
import com.bookland.service.sachHinhAnhService;

@Service
public class sachHinhAnhServiceImpl implements sachHinhAnhService {
	
	@Autowired
	hinhAnhSachDAO dao;
	@Override
	public void save(hinhAnhSach image) {
		dao.save(image);
		
	}
	

}