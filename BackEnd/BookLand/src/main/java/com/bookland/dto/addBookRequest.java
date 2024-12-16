package com.bookland.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class addBookRequest {
    private String maSach;
    private String tenSach;
    private String nxb;
    private int namXB;
    private double tienSach;
    private String maTacGia; // ID of TacGia
    private String hinhAnhSach;
    private String moTa;
    private List<String> theLoaiIds;

}
