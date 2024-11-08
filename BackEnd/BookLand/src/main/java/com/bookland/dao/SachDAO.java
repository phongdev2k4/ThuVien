package com.bookland.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.bookland.dto.SachDTO;
import com.bookland.entity.Sach;

public interface SachDAO extends JpaRepository<Sach, String> {

}
