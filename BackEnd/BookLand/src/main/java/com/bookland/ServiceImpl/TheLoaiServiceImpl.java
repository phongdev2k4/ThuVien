package com.bookland.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.DAO.TheLoaiDAO;
import com.bookland.Service.TheLoaiService;
import com.bookland.entity.TheLoai;


@Service
public class TheLoaiServiceImpl implements TheLoaiService{
    
	@Autowired
	TheLoaiDAO theLoaiDAO;
	@Override
	public List<TheLoai> finAll() {
		List<TheLoai> theLoais=theLoaiDAO.findAll();
		return theLoais;
	}

	@Override
	public TheLoai create(TheLoai theloai) {
		return theLoaiDAO.save(theloai);
	}

	@Override
	public void delete(String matheloai) {
		theLoaiDAO.deleteById(matheloai);
		
	}

}
