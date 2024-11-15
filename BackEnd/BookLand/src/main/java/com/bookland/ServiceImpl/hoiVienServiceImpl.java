package com.bookland.ServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.hoiVienDAO;
import com.bookland.entity.HoiVien;
import com.bookland.service.hoiVienService;
@Service
public class hoiVienServiceImpl implements hoiVienService{
	 @Autowired
	 hoiVienDAO hvDAO;
	@Override
	public List<HoiVien> findHoiVienByName(String name) {
		List<HoiVien> hvList = hvDAO.findByHoTenContaining(name);
//		List<String> Name = new ArrayList<>();
//		for(HoiVien hv : hvList) {
//			Name.add(hv.getHoTen());
//		}
		return hvList;
	}
	@Override
	public Optional<HoiVien> findById(String maHV) {
		return hvDAO.findById(maHV);
	}

}
