package com.bookland.ServiceImpl;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dao.SachDAO;
import com.bookland.dao.SachTheLoaiDAO;
import com.bookland.dto.SachDTO;
import com.bookland.service.SachService;
import com.bookland.utils.ImageUtils;
import com.bookland.entity.Sach;
import com.bookland.entity.SachTheLoai;
import com.bookland.entity.TheLoai;

@Service
public class SachServiceLmpl implements SachService {

	@Autowired
	SachDAO sachDAO;
	@Autowired
	SachTheLoaiDAO sachTheLoaiDAO;

	@Override
	public List<Sach> finAll() {
		List<Sach> sachs = sachDAO.findAll();
		return sachs;
	}


	@Override
	public List<SachDTO> getAllSachDTOs() {
		List<Sach> sachs = sachDAO.findAll();
		return sachs.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private SachDTO convertToDTO(Sach sach) {
		SachDTO dto = new SachDTO();
		dto.setMaSach(sach.getMaSach());
		dto.setTenSach(sach.getTenSach());
		dto.setNxb(sach.getNxb());
		dto.setNamXB(sach.getNamXB());
		dto.setTacGia(sach.getTacGia());
		dto.setHinhAnhSach(sach.getHinhAnhSach());
		dto.setMoTa(sach.getMoTa());

		// Lấy danh sách thể loại thông qua bảng trung gian
		List<TheLoai> theLoais = sachTheLoaiDAO.findBySach(sach); // Cần viết phương thức trong SachTheLoaiRepository
		dto.setTheLoais(theLoais);

		return dto;
	}

	@Override
	public Sach create(Sach sach) {
		return sachDAO.save(sach);
	}

	@Override
	public void delete(String masach) {
		sachDAO.deleteById(masach);

	}

	@Override
	public void deleteSachdto(String masach) {
		sachTheLoaiDAO.deleteBySach_MaSach(masach);
		sachDAO.deleteById(masach);
	}

	@Override
	public Sach create2(SachDTO sachDto, MultipartFile file) {
		// Tạo đối tượng Sach từ SachDTO
		Sach sach = new Sach();
		sach.setMaSach(sachDto.getMaSach());
		sach.setTenSach(sachDto.getTenSach());
		sach.setNxb(sachDto.getNxb());
		sach.setNamXB(sachDto.getNamXB());
		sach.setTacGia(sachDto.getTacGia());
		sach.setMoTa(sachDto.getMoTa());
		// Xử lý lưu hình ảnh
		if (file != null && !file.isEmpty()) {
			String nameImg;
			try {
				nameImg = ImageUtils.saveImage(file, "book");
				sach.setHinhAnhSach(nameImg); // Gán tên hình ảnh vào đối tượng Sach
			} catch (IOException e) {
				e.printStackTrace();
			}
			Sach savedSach = sachDAO.save(sach);
			// Lấy danh sách thể loại hiện tại của 1 quyển sách từ cơ sở dữ liệu
			List<TheLoai> TheLoais = sachTheLoaiDAO.findBySach(sach);
			// Tạo danh sách ID thể loại từ sachDto
			List<String> newTheLoaiIds = sachDto.getTheLoais().stream().map(TheLoai::getMaTheLoai)
					.collect(Collectors.toList());
			// Xóa các thể loại không có trong danh sách mới
			for (TheLoai theLoai : TheLoais) {
				if (!newTheLoaiIds.contains(theLoai.getMaTheLoai())) {
					sachTheLoaiDAO.deleteBySachMaSachAndTheLoaiMaTheLoai(savedSach.getMaSach(), theLoai.getMaTheLoai());
				}
			}
			// Thêm các thể loại mới
			for (TheLoai theLoai : sachDto.getTheLoais()) {
				if (!TheLoais.stream().map(TheLoai::getMaTheLoai).collect(Collectors.toList())
						.contains(theLoai.getMaTheLoai())) {
					sachTheLoaiDAO.insertSachTheLoai(sach.getMaSach(),theLoai.getMaTheLoai());
			        
				}
			}
			return savedSach;
		} else {
			sach.setHinhAnhSach(sachDto.getHinhAnhSach()); 
			Sach savedSach = sachDAO.save(sach);
			// Lấy danh sách thể loại hiện tại của 1 quyển sách từ cơ sở dữ liệu
			List<TheLoai> TheLoais = sachTheLoaiDAO.findBySach(sach);
			// Tạo danh sách ID thể loại từ sachDto
			List<String> newTheLoaiIds = sachDto.getTheLoais().stream().map(TheLoai::getMaTheLoai)
					.collect(Collectors.toList());
			// Xóa các thể loại không có trong danh sách mới
			for (TheLoai theLoai : TheLoais) {
				if (!newTheLoaiIds.contains(theLoai.getMaTheLoai())) {
					sachTheLoaiDAO.deleteBySachMaSachAndTheLoaiMaTheLoai(savedSach.getMaSach(), theLoai.getMaTheLoai());
				}
			}
			// Thêm các thể loại mới
			for (TheLoai theLoai : sachDto.getTheLoais()) {
				if (!TheLoais.stream().map(TheLoai::getMaTheLoai).collect(Collectors.toList())
						.contains(theLoai.getMaTheLoai())) {
					sachTheLoaiDAO.insertSachTheLoai(sach.getMaSach(),theLoai.getMaTheLoai());
			        
				}
			}
			return savedSach;
		}
	}



}
