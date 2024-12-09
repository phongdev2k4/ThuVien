package com.bookland.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bookland.dto.HighDemandBookReport;
import com.bookland.report.BorrowReport;
import com.bookland.report.BorrowReport123;
import com.bookland.report.MostBorrowedBook;

@Service
public interface ReportService {

	List<BorrowReport> generateBorrowReport();

	Map<String, Integer> getConditionCounts();

	List<MostBorrowedBook> getTop5MostBorrowedBooks();

	Map<String, Long> generateReportBookHoiVien();

	List<BorrowReport123> getBorrowReport(Integer day, Integer month, Integer year);

	List<Object[]> getYearlyReport(Integer year);

	List<Object[]> getMonthlyReport(Integer year);

	List<Object[]> getDailyReport(Integer year,Integer month);

	List<Map<String, Object>> getBorrowingTrendsByGenre();

	Map<String, Long> getInventoryHealthReport();

	List<HighDemandBookReport> getHighDemandBooksWithInsufficientCopies();

	

}
