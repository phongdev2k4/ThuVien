package com.bookland.dto;

import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class addPhieuMuondto {
	  	private String maHV;
	    private String searchTerm;
	    private List<String> tenSach;
	    private Date ngayMuon;
	    private Date ngayTra;
	    private String maNV;
}
