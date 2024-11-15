package com.bookland.service;



import org.springframework.stereotype.Service;

import com.bookland.entity.PhieuTra;

@Service
public interface  PhieuTraService {
	PhieuTra create(String maNV, String[] maVach);
	

}
