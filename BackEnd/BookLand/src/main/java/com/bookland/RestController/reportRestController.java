package com.bookland.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.report.BorrowReport;
import com.bookland.report.BorrowReport123;
import com.bookland.report.MostBorrowedBook;
import com.bookland.service.ReportService;

@RestController
@RequestMapping("/report")
public class reportRestController {
	@Autowired
	private ReportService reportService;

	@GetMapping("/borrowed")
	public ResponseEntity<List<BorrowReport>> getBorrowReport() {
		List<BorrowReport> report = reportService.generateBorrowReport();
		return ResponseEntity.ok(report);
	}
	

	@GetMapping("/condition-status")
	public ResponseEntity<Map<String, Integer>> getConditionReport() {
        Map<String, Integer> conditionCounts = reportService.getConditionCounts();
	    return ResponseEntity.ok(conditionCounts);
	}
	 @GetMapping("/most-borrowed")
	    public ResponseEntity<List<MostBorrowedBook>> getTop5MostBorrowedBooks() {
	        List<MostBorrowedBook> topBooks = reportService.getTop5MostBorrowedBooks();
	        return ResponseEntity.ok(topBooks);
	    }
	  @GetMapping("/counts")
	    public Map<String, Long> getReportCounts() {
	        return reportService.generateReportBookHoiVien();
	    }
	  @GetMapping("/api/reports")
	    public List<BorrowReport123> getBorrowReport(
	        @RequestParam(required = false) Integer day,
	        @RequestParam(required = false) Integer month,
	        @RequestParam(required = false) Integer year
	    ) {
	        return reportService.getBorrowReport(day, month, year);
	    }
	  @GetMapping("/yearly")
	    public List<Object[]> getYearlyReport(@RequestParam Integer year) {
	        return reportService.getYearlyReport(year);
	    }

	    // Endpoint to get the monthly report for a specific year
	    @GetMapping("/monthly")
	    public List<Object[]> getMonthlyReport(@RequestParam Integer year) {
	        return reportService.getMonthlyReport(year);
	    }

	    // Endpoint to get the daily report for a specific month and year
	    @GetMapping("/daily")
	    public List<Object[]> getDailyReport(@RequestParam Integer year,@RequestParam Integer month) {
	        return reportService.getDailyReport(year,month);
	    }
	    @GetMapping("/borrowing-trends-by-genre")
	    public ResponseEntity<List<Map<String, Object>>> getBorrowingTrendsByGenre() {
	        List<Map<String, Object>> data = reportService.getBorrowingTrendsByGenre();
	        return ResponseEntity.ok(data);
	    }
	    
	    @GetMapping("/inventory-health")
	    public ResponseEntity<Map<String, Long>> getInventoryHealthReport() {
	        return ResponseEntity.ok(reportService.getInventoryHealthReport());
	    }

}
