package com.bookland.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class xuLiMuonOnlineDTO {
	private String maHV;
    private int idMuonOnline;
    private List<String> tenSach;
    private Date ngayMuon;
    private Date ngayTra;
    private String maNV;
}
