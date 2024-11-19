package com.bookland.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class phieuPhatDTO { // Unique identifier for the penalty slip
	private String maHV; // Member ID (Mã Hội Viên) // Return slip ID (Mã Phiếu Trả)
	private String maPT;
	private int soNgayQuaHan; // Number of overdue days
	private double tienPhat; // Fine amount
	private String maNV;
}
