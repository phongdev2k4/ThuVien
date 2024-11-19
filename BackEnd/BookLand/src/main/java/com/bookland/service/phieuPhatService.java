package com.bookland.service;

import org.springframework.stereotype.Service;

import com.bookland.dto.phieuPhatDTO;
import com.bookland.entity.PhieuPhat;

@Service
public interface phieuPhatService {

	PhieuPhat create(phieuPhatDTO ppRequest);

}
