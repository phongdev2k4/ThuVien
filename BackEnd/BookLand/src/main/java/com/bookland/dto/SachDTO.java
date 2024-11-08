package com.bookland.dto;

import java.util.List;

import com.bookland.entity.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SachDTO {
    private String maSach;
    private String tenSach;
    private String nxb;
    private int namXB;
    private TacGia tacGia;
    private String hinhAnhSach;
    private String moTa;
    private List<TheLoai> theLoais;
}
