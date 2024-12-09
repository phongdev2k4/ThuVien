package com.bookland.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dto.addBookRequest;
import com.bookland.dto.addBookResponse;
import com.bookland.entity.HoiVien;
import com.bookland.entity.NhanVien;

@Service 
public interface hoiVienService {

	List<HoiVien> findHoiVienByName(String name);

	 Optional<HoiVien> findById(String maHV);
		

	 Optional<HoiVien> findByUsername(String username); // tìm hội viên dựa vào username
	
     
//	 Optional<HoiVien> findById(String maHV);
		
	 public HoiVien updateHV(String userName,HoiVien hoivien,MultipartFile file);
     public List <HoiVien> finAll();
	 public HoiVien create(HoiVien hoivien,MultipartFile file);
	 public void delete(String maHoiVien); 
	 public HoiVien  update(HoiVien hoiVien,MultipartFile file);
	 
	 Page<HoiVien> searchHoiViens(String keyword, Pageable pageable);
}
