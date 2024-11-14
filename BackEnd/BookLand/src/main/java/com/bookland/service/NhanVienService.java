package com.bookland.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.bookland.entity.NhanVien;

public interface NhanVienService {
  public List<NhanVien> finAll();
  public  NhanVien create(NhanVien nhanVien, MultipartFile file);
  public NhanVien update(NhanVien nhanVien,MultipartFile file);
  public void delete(String maNhanVien);
}
