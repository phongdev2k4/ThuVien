package com.bookland.ServiceImpl;

import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dao.SachDAO;
import com.bookland.dao.SachTheLoaiDAO;
import com.bookland.dao.TacGiaDAO;
import com.bookland.dao.TheLoaiDAO;
import com.bookland.dto.addBookRequest;
import com.bookland.dto.addBookResponse;
import com.bookland.service.SachService;
import com.bookland.service.sachHinhAnhService;
import com.bookland.utils.CloudinaryService;
import com.cloudinary.Cloudinary;

import com.bookland.entity.Sach;
import com.bookland.entity.SachTheLoai;
import com.bookland.entity.TacGia;
import com.bookland.entity.TheLoai;
import com.bookland.entity.hinhAnhSach;

@Service
public class SachServiceLmpl implements SachService {

	@Autowired
	SachDAO sachDAO;
	@Autowired
	TacGiaDAO tgDAO;
	@Autowired
	TheLoaiDAO tlDAO;
	@Autowired
	SachTheLoaiDAO stlDAO;
	@Autowired
	sachHinhAnhService imgService;

	@Autowired
	CloudinaryService cloudinaryService;

	@Override
	public List<addBookResponse> finAll() {
		List<Object[]> results = sachDAO.findAllBooksWithDetails();
		return results.stream().map(this::mapToAddBookResponse).collect(Collectors.toList());
	}

	private addBookResponse mapToAddBookResponse(Object[] row) {
		String maSach = (String) row[0];
		String tenSach = (String) row[2]; // Comma-separated genres
		String tenTacGia = (String) row[4];
		String moTa = (String) row[5];

		// Convert the comma-separated string to a List<String>
		// kiểm tra null trước khi gọi split
		List<String> Images = row[1] != null ? Arrays.asList(((String) row[1]).split(", ")) : new ArrayList<>();
		List<String> tenTheLoai = row[3] != null ? Arrays.asList(((String) row[3]).split(", ")) : new ArrayList<>();


		return new addBookResponse(maSach, Images, tenSach, tenTheLoai, tenTacGia, moTa);
	}

//	@Override
//	public Sach create(Sach sach) {
//		return sachDAO.save(sach);
//	}

	@Override
	public void delete(String masach) {
		sachDAO.deleteById(masach);

	}

	@Override
	public addBookResponse create(addBookRequest request, MultipartFile[] files) {
		System.out.print(files);
		Sach s = new Sach();
		s.setTenSach(request.getTenSach());
		s.setMoTa(request.getMoTa());
		s.setMaSach(request.getMaSach());

		// tao tacGia
		TacGia tg = tgDAO.findByMaTacGia(request.getMaTacGia());
		s.setTacGia(tg);
		s.setMoTa(request.getMoTa());
		s.setNxb(request.getNxb());

		// them sach vao databasex
		System.out.print(s);
		sachDAO.save(s);

		// tao the loai sach
		for (String a : request.getTheLoaiIds()) {
			SachTheLoai stl = new SachTheLoai();
			stl.setSach(s);
			stl.setTheLoai(tlDAO.findByMaTheLoai(a));
			stlDAO.save(stl);
		}

		// tao bang trung gian sach va tL
		List<SachTheLoai> sachTheLoaiList = stlDAO.findByMaSach(s.getMaSach());
		List<String> tenTheLoai = new ArrayList<>();
		for (SachTheLoai a : sachTheLoaiList) {
			TheLoai tl = tlDAO.findByMaTheLoai(a.getTheLoai().getMaTheLoai());
			tenTheLoai.add(tl.getTenTheLoai());
		}

//		/////>>>>them hinh anh vao database + cloudinary 
		List<String> UrlImage = new ArrayList<>();
		List<String> failedUploads = new ArrayList<>();
		for (int i = 0; i < files.length; i++) {
			MultipartFile multipartFile = files[i];
			try {
				// Upload the image to Cloudinary
				Map result = cloudinaryService.upload(multipartFile);

				// Xác định loại hình ảnh dựa trên vị trí của nó
				String imageType;
				switch (i) {
				case 0:
					imageType = "COVER";
					break;
				case 1:
					imageType = "BACKSIDE";
					break;
				case 2:
					imageType = "FRONTSIDE";
					break;
				default:
					imageType = "OTHER";
					break;
				}

				// Create the HinhAnhSach entity
				hinhAnhSach image = new hinhAnhSach((String) result.get("original_filename"),
						(String) result.get("url"), (String) result.get("public_id"), s // The associated Sach entity
				);
				image.setImageType(imageType); // Set the image type

				// Save the image metadata to the database
				imgService.save(image);
				UrlImage.add(image.getImageUrl());
			} catch (Exception e) {
				failedUploads.add(multipartFile.getOriginalFilename());
			}
		}

//	       

		//// >>>>>
		// return response cho client
		addBookResponse response = new addBookResponse();
		response.setMaSach(s.getMaSach());
		response.setTenSach(s.getTenSach());
		response.setTenTheLoai(tenTheLoai);
		response.setTenTacGia(s.getTacGia().getTenTacGia());
		response.setMoTa(s.getMoTa());
		response.setImageUrl(UrlImage);
		return response;
	}

	@Override
	public List<Sach> findAllBooks() {
		return sachDAO.findAll();
	}

	@Override
	public List<addBookResponse> findBookDetailsByName(String tenSach) {
		List<Object[]> results = sachDAO.findBookDetailsByName(tenSach);
		return results.stream().map(this::mapToAddBookResponse).collect(Collectors.toList());
	}
	
	
//	@Override
//	public addBookResponse findBookDetailsByMaSach(String maSach) {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
