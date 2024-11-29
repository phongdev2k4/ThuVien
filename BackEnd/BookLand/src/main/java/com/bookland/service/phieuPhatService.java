package com.bookland.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookland.dto.phieuPhatDTO;
import com.bookland.entity.PhieuPhat;
import com.bookland.entity.PhieuTra;

@Service
public interface phieuPhatService {

	PhieuPhat create(phieuPhatDTO ppRequest);

	List<PhieuTra> findAllPhieuTraViPham();

}
