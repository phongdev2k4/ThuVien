package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookland.entity.PhieuTra;

public interface phieuTraDAO extends JpaRepository<PhieuTra,Integer> {
	@Query(value = "SELECT DISTINCT a.maPT " +
            "FROM chi_tiet_phieu_tra a " +
            "JOIN phieu_tra b ON a.maPT = b.maPT " +
            "WHERE b.is_fine = 'CHUA_PHAT'", nativeQuery = true)
List<Integer> findDistinctMaPTWithUnpaidFine();

}
