package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.hinhAnhSach;

public interface hinhAnhSachDAO extends JpaRepository<hinhAnhSach, Long> {
	List<hinhAnhSach> findByImageType(String imageType);
}
