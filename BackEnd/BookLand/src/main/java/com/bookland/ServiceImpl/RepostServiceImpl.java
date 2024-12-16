package com.bookland.ServiceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.BanSaoSachDAO;
import com.bookland.dao.hoiVienDAO;
import com.bookland.dao.phieuMuonDAO;
import com.bookland.dto.HighDemandBookReport;
import com.bookland.report.BorrowReport;
import com.bookland.report.BorrowReport123;
import com.bookland.report.MostBorrowedBook;
import com.bookland.service.ReportService;

@Service
public class RepostServiceImpl implements ReportService{

	@Autowired
	phieuMuonDAO pmDao;
	
	@Autowired
	BanSaoSachDAO bssDao;
	@Autowired
	hoiVienDAO hoiVienRepository;
	
	
	@Override
	public List<BorrowReport> generateBorrowReport() {	
		return pmDao.getBorrowReport();
	}

	@Override
	public Map<String, Integer> getConditionCounts() {
		 Map<String, Integer> conditionCounts = new HashMap();
	        // Count the number of books for each condition
	        conditionCounts.put("new", bssDao.countByCondition("Mới"));
	        conditionCounts.put("broken", bssDao.countByCondition("Hỏng"));
	        conditionCounts.put("lost", bssDao.countByCondition("Mất"));
	        
	        return conditionCounts;
	}

	@Override
	public List<MostBorrowedBook> getTop5MostBorrowedBooks() {
		// TODO Auto-generated method stub
		return pmDao.findTop5MostBorrowedBooks(5);
	}

	@Override
	public Map<String, Long> generateReportBookHoiVien() {
	    Map<String, Long> report = new HashMap<>();

        // Count number of HoiVien
        long hoiVienCount = hoiVienRepository.count();
        
        // Count total number of Sach
        long sachCount = bssDao.countAllSach();
        
        // Count number of Sach with TrangThaiBaoQuan != 'Mới'
        long sachWithNonNewConditionCount = bssDao.countBooksWithConditionNotMới("Mới");
        
        long sachWithNewConditionCount = bssDao.countByCondition("Mới");

        // Add values to the report map
        report.put("HoiVien", hoiVienCount);
        report.put("Sach", sachCount);
        report.put("SachNonNewCondition", sachWithNonNewConditionCount);
        report.put("sachWithNewConditionCount",sachWithNewConditionCount);

        return report;
	}
	@Override
	public List<BorrowReport123> getBorrowReport(Integer day, Integer month, Integer year) {
	    List<Object[]> results = pmDao.getBorrowReportNative(day, month, year);

	    return results.stream()
	                  .map(row -> {
	                      Date ngayLapPhieu = (Date) row[0]; // ngayLapPhieu (Date)
	                      Long maPMCount = (row[1] != null) ? ((Number) row[1]).longValue() : 0L;  // maPMCount (Long)
	                      Long chiTietCount = (row[2] != null) ? ((Number) row[2]).longValue() : 0L;  // chiTietCount (Long)

	                      return new BorrowReport123(ngayLapPhieu, maPMCount, chiTietCount);
	                  })
	                  .collect(Collectors.toList());
	}

	@Override
	public List<Object[]> getYearlyReport(Integer year) {
		// TODO Auto-generated method stub
		 return pmDao.getYearlyReport(year);
	}

	@Override
	public List<Object[]> getMonthlyReport(Integer year) {
		// TODO Auto-generated method stub
		return pmDao.getMonthlyReport(year);
	}

	@Override
	public List<Object[]> getDailyReport(Integer year,Integer month) {
		// TODO Auto-generated method stub
		return pmDao.getWeeklyReport(year,month);
	}

	@Override
	public List<Map<String, Object>> getBorrowingTrendsByGenre() {
		 List<Object[]> rawData = pmDao.findBorrowingTrendsByGenre();
	        List<Map<String, Object>> results = new ArrayList<>();
	        
	        for (Object[] row : rawData) {
	            Map<String, Object> map = new HashMap<>();
	            map.put("genre", row[0]); // Genre name
	            map.put("borrowCount", row[1]); // Borrow count
	            results.add(map);
	        }
	        return results;
	}

	@Override
	public Map<String, Long> getInventoryHealthReport() {
		Long availableBooks = pmDao.countAvailableBooks("Có sẵn","Mới");
	    Long borrowedBooks = pmDao.countBorrowedBooks();
	    Map<String, Long> report = new HashMap<>();
	    report.put("Available Books", availableBooks);
	    report.put("Borrowed Books", borrowedBooks);
	    return report;
	}

	@Override
	public List<HighDemandBookReport> getHighDemandBooksWithInsufficientCopies() {
		List<Object[]> results = pmDao.findTop3HighDemandBooksWithInsufficientOrDamagedCopies(3,"Có sẵn","Mới");

		 return results.stream()
                 .map(r -> new HighDemandBookReport(
                         (String) r[0],    // bookName
                         (Long) r[1],      // borrowCount
                         (Long) r[2],      // unavailableCopies
                         (Long) r[3]       // damagedCopies
                 ))
                 .collect(Collectors.toList());
	}




}
