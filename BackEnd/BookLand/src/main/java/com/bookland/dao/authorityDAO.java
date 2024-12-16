package com.bookland.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.Authority;

public interface authorityDAO extends JpaRepository<Authority,Integer> {
	void deleteByTaiKhoanUserName(String username);
}
