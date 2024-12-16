package com.bookland.report;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BorrowReport {
	  	private Date borrowDate;
	    private long totalPhieuMuon;   // Total borrowing records
	    private long totalBooksBorrowed;

}
