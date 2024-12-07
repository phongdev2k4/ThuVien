package com.bookland.dto;

import java.util.Date;
import java.util.List;

import com.bookland.entity.PhieuMuon;
import com.bookland.entity.PhieuPhat;
import com.bookland.entity.PhieuTra;
import com.bookland.entity.TaiKhoan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class addBookResponse {
    private String maSach;
    private List<String>imageUrl;
    private String tenSach;
    private List<String> tenTheLoai;
    private String tenTacGia;
    private String moTa;

    
    
}
