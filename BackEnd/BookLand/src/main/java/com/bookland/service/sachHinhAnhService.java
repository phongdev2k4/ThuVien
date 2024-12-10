package com.bookland.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookland.entity.hinhAnhSach;


public interface sachHinhAnhService {

	void save(hinhAnhSach image);

	List<hinhAnhSach> getCoverImages();
	
	List<hinhAnhSach> getImagesByMaSach(String maSach);

}
