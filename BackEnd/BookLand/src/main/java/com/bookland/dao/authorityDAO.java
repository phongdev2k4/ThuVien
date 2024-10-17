package com.bookland.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookland.entity.Authority;

public interface authorityDAO extends JpaRepository<Authority,Integer> {

}
