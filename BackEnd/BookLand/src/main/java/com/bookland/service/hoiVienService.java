package com.bookland.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.bookland.entity.HoiVien;

@Service 
public interface hoiVienService {

	List<HoiVien> findHoiVienByName(String name);

	 Optional<HoiVien> findById(String maHV);
		


	

//	 Optional<HoiVien> findById(String maHV);
		


	

}
