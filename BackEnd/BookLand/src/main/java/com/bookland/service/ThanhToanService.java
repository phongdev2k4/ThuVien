package com.bookland.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.bookland.entity.ThanhToan;

public interface ThanhToanService {
	public Page<ThanhToan> TimLichSuThanhToanHV(String maHV, int page, int size);
    public ThanhToan create(ThanhToan thanhToan);
    
}
