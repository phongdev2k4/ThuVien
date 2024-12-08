package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.entity.PhieuMuon;
import com.bookland.report.BorrowReport;
import com.bookland.report.BorrowReport123;
import com.bookland.report.MostBorrowedBook;

public interface phieuMuonDAO extends JpaRepository<PhieuMuon, Integer> {
	@Query("SELECT pm.maPM FROM PhieuMuon pm WHERE pm.hoiVien.maHV = :maHV")
	List<Integer> findIdPhieuMuonByHoiVienMaHV(String maHV);

	@Query("SELECT pm FROM PhieuMuon pm "
			+ "WHERE pm.maPM IN (SELECT ctp.phieuMuon.maPM FROM ChiTietPhieuMuon ctp WHERE ctp.banSaoSach.maBanSaoSach = :maBanSaoSach AND ctp.isReturned = false) "
			+ "AND pm.hoiVien.maHV = :maHV ")
	List<PhieuMuon> findByMaBanSaoSachAndMaHV(@Param("maBanSaoSach") Integer maBanSaoSach, @Param("maHV") String maHV);

	@Query("SELECT pm FROM PhieuMuon pm "
			+ "WHERE pm.maPM IN (SELECT ctp.phieuMuon.maPM FROM ChiTietPhieuMuon ctp WHERE ctp.isReturned = false) ")
	List<PhieuMuon> findByAllPhieuMuon();
	
	//////////report ////////////////////////////////////////

	@Query("SELECT new com.bookland.report.BorrowReport(\n" + "    CAST(p.ngayLapPhieu AS date), \n"
			+ "    COUNT(DISTINCT p.maPM), \n" + "    COUNT(c)\n" + ")\n" + "FROM PhieuMuon p \n"
			+ "JOIN ChiTietPhieuMuon c ON p.maPM = c.phieuMuon.maPM\n" + "GROUP BY CAST(p.ngayLapPhieu AS date)\n"
			+ "ORDER BY CAST(p.ngayLapPhieu AS date) ASC\n" + "")
	List<BorrowReport> getBorrowReport();

	@Query("SELECT new com.bookland.report.MostBorrowedBook(bs.sach.tenSach, COUNT(c)) " + "FROM ChiTietPhieuMuon c "
			+ "JOIN c.banSaoSach bs " + "WHERE c.isReturned = false " + // Optional: if you only want to count books
																		// that haven't been returned
			"GROUP BY bs.sach.tenSach " + "ORDER BY COUNT(c) DESC")
	List<MostBorrowedBook> findTop5MostBorrowedBooks(@Param("limit") int limit);

	@Query(value = """
			SELECT
			    CAST(p.ngay_lap_phieu AS DATE) AS ngayLapPhieu,
			    COUNT(DISTINCT p.maPM) AS maPMCount,
			    COUNT(c.id) AS chiTietCount
			FROM phieu_muon p
			JOIN chi_tiet_phieu_muon c ON p.maPM = c.mapm
			WHERE (:day IS NULL OR DAY(p.ngay_lap_phieu) = :day)
			  AND (:month IS NULL OR MONTH(p.ngay_lap_phieu) = :month)
			  AND (:year IS NULL OR YEAR(p.ngay_lap_phieu) = :year)
			GROUP BY CAST(p.ngay_lap_phieu AS DATE)
			ORDER BY CAST(p.ngay_lap_phieu AS DATE) ASC
			""", nativeQuery = true)
	List<Object[]> getBorrowReportNative(@Param("day") Integer day, @Param("month") Integer month,
			@Param("year") Integer year);

	// Query to get the report for a specific year
	@Query(value = """
			    SELECT
			        YEAR(p.ngay_lap_phieu) AS year,
			        COUNT(DISTINCT p.maPM) AS maPMCount,
			        COUNT(c.id) AS chiTietCount
			    FROM phieu_muon p
			    JOIN chi_tiet_phieu_muon c ON p.maPM = c.mapm
			    WHERE YEAR(p.ngay_lap_phieu) = :year
			    GROUP BY YEAR(p.ngay_lap_phieu)
			    ORDER BY YEAR(p.ngay_lap_phieu) ASC
			""", nativeQuery = true)
	List<Object[]> getYearlyReport(@Param("year") Integer year);

	// Query to get the report for a specific month in the selected year
	@Query(value = """
			    SELECT
			        MONTH(p.ngay_lap_phieu) AS month,
			        COUNT(DISTINCT p.maPM) AS maPMCount,
			        COUNT(c.id) AS chiTietCount
			    FROM phieu_muon p
			    JOIN chi_tiet_phieu_muon c ON p.maPM = c.mapm
			    WHERE YEAR(p.ngay_lap_phieu) = :year
			    GROUP BY MONTH(p.ngay_lap_phieu)
			    ORDER BY MONTH(p.ngay_lap_phieu) ASC
			""", nativeQuery = true)
	List<Object[]> getMonthlyReport(@Param("year") Integer year);

	// Query to get the report for a specific day in the selected month and year
	// Repository method for fetching weekly report for a specific month and year
	@Query(value = """
				   SELECT
			    -- Calculate week number of the month (not calendar year)
			    DATEPART(WEEK, p.ngay_lap_phieu) - DATEPART(WEEK, DATEFROMPARTS(YEAR(p.ngay_lap_phieu), MONTH(p.ngay_lap_phieu), 1)) + 1 AS week,
			    COUNT(DISTINCT p.maPM) AS maPMCount,
			    COUNT(c.id) AS chiTietCount
			FROM phieu_muon p
			JOIN chi_tiet_phieu_muon c ON p.maPM = c.mapm
			WHERE YEAR(p.ngay_lap_phieu) = :year
			  AND MONTH(p.ngay_lap_phieu) = :month
			GROUP BY DATEPART(WEEK, p.ngay_lap_phieu) - DATEPART(WEEK, DATEFROMPARTS(YEAR(p.ngay_lap_phieu), MONTH(p.ngay_lap_phieu), 1)) + 1
			ORDER BY week;

				""", nativeQuery = true)
	List<Object[]> getWeeklyReport(@Param("year") Integer year, @Param("month") Integer month);
	
	

    @Query("SELECT stl.theLoai.tenTheLoai, COUNT(ctpm.id) " +
           "FROM ChiTietPhieuMuon ctpm " +
           "JOIN ctpm.banSaoSach bss " +
           "JOIN bss.sach s " +
           "JOIN s.sachTheLoaiList stl " +
           "GROUP BY stl.theLoai.tenTheLoai")
    List<Object[]> findBorrowingTrendsByGenre();
    
    
    @Query("SELECT COUNT(bs) FROM BanSaoSach bs WHERE bs.trangThaiMuon = :available and bs.trangThaiBaoQuan =:ttbq")
    Long countAvailableBooks(@Param("available") String available,@Param("ttbq") String ttbq);
    
    @Query("SELECT COUNT(c) FROM ChiTietPhieuMuon c WHERE c.isReturned = false")
    Long countBorrowedBooks();



}
