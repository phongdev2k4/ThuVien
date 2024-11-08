package com.bookland.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.bookland.dto.SachDTO;
import com.bookland.entity.*;

public interface SachService {
	public List<Sach> finAll();
	public List<SachDTO> getAllSachDTOs();
	public Sach create(Sach sach);
	public Sach create2(SachDTO sachdto, MultipartFile file);
	public void delete(String masach);
	public void deleteSachdto(String masach); // xóa các sách có trong sách thể loại  và xóa sách trong bản sách
}
