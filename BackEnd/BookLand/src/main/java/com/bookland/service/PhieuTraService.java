package com.bookland.service;



import java.util.List;

import org.springframework.stereotype.Service;

import com.bookland.dto.phieuTraResponse;
import com.bookland.entity.ChiTietPhieuTra;
import com.bookland.entity.PhieuTra;

@Service
public interface  PhieuTraService {
	PhieuTra create(phieuTraResponse []res);

	List<PhieuTra> findAll();

	List<ChiTietPhieuTra> findAllByIdPT(Integer maPT);

	
	

}
