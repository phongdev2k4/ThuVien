package com.bookland.report;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BorrowReport123 {
	 	private Date ngayLapPhieu;
	    private Long maPMCount;
	    private Long chiTietCount; // Number of items borrowed
	
}
