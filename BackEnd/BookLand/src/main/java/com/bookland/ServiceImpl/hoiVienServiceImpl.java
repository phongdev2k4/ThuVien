package com.bookland.ServiceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dao.authorityDAO;
import com.bookland.dao.hoiVienDAO;
import com.bookland.dao.taiKhoanDAO;
import com.bookland.entity.Authority;
import com.bookland.entity.ChucVu;
import com.bookland.entity.HoiVien;
import com.bookland.entity.NhanVien;
import com.bookland.entity.TaiKhoan;
import com.bookland.service.hoiVienService;
import com.bookland.utils.CloudinaryUtils;

import jakarta.transaction.Transactional;

@Service
public class hoiVienServiceImpl implements hoiVienService {
	@Autowired
	hoiVienDAO hvDAO;
	@Autowired
	taiKhoanDAO taiKhoanDAO;
	@Autowired
	authorityDAO authorityDAO;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<HoiVien> findHoiVienByName(String name) {
		List<HoiVien> hvList = hvDAO.findByHoTenContaining(name);
//		List<String> Name = new ArrayList<>();
//		for(HoiVien hv : hvList) {
//			Name.add(hv.getHoTen());
//		}
		return hvList;
	}

	@Override
	public Optional<HoiVien> findById(String maHV) {
		return hvDAO.findById(maHV);
	}

	@Override
	public Optional<HoiVien> findByUsername(String username) {
		return hvDAO.findByTaiKhoanHV_UserName(username);
	}

	@Override
	public HoiVien updateHV(String userName, HoiVien hoivien, MultipartFile file) {
		TaiKhoan tk = taiKhoanDAO.findByUserName(userName).get();
		HoiVien hvtimkiem = hvDAO.findByTaiKhoanHV_UserName(userName).get();
		HoiVien hoiv = new HoiVien();
		hoiv.setMaHV(hvtimkiem.getMaHV());
		hoiv.setHoTen(hoivien.getHoTen());
		hoiv.setEmail(hoivien.getEmail());
		hoiv.setDiaChi(hoivien.getDiaChi());
		hoiv.setSoDienThoai(hoivien.getSoDienThoai());
		hoiv.setThoiGianDangKy(hvtimkiem.getThoiGianDangKy());
		hoiv.setTinhTrang(hvtimkiem.isTinhTrang());
		hoiv.setTienNap(hvtimkiem.getTienNap());
		hoiv.setTaiKhoanHV(tk);

		if (file != null && !file.isEmpty()) {
			String linkanh_key;
			try {
				if(hvtimkiem.getHinhAnhHV()!=null) {
					if(hvtimkiem.getHinhAnhHV().equals("")) {
						linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/HoiVien");
						hoiv.setHinhAnhHV(linkanh_key);
					}else {
						String keyAnh = hvtimkiem.getHinhAnhHV().split(",")[1];
						CloudinaryUtils.deleteImage(keyAnh);
						linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/HoiVien");
						hoiv.setHinhAnhHV(linkanh_key);
					}

				}else {
					linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/HoiVien");
					hoiv.setHinhAnhHV(linkanh_key);
				}
			} catch (IOException e) {
			}

		} else {
			hoiv.setHinhAnhHV(hvtimkiem.getHinhAnhHV());
		}
		HoiVien saveHoivien = hvDAO.save(hoiv);
		return saveHoivien;
	}

	@Override
	public List<HoiVien> finAll() {
		List<HoiVien> hoiviens = hvDAO.findAll();
		return hoiviens;
	}

	@Override
	public HoiVien create(HoiVien hoivien, MultipartFile file) {
		if (file != null && !file.isEmpty()) {
			try {
				String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/HoiVien");
				hoivien.setHinhAnhHV(linkanh_key);
			} catch (Exception e) {
				e.printStackTrace();
			}
			hoivien.getTaiKhoanHV().setPassword(passwordEncoder.encode(hoivien.getTaiKhoanHV().getPassword()));
			TaiKhoan saveTaiKhoan =taiKhoanDAO.save(hoivien.getTaiKhoanHV());
			ChucVu chucVu=new ChucVu();
			chucVu.setId("R3");
			Authority authority=new Authority();
			authority.setChucVu(chucVu);
			authority.setTaiKhoan(saveTaiKhoan);
			Authority saveauthority = authorityDAO.save(authority);
			Integer maxMaHV=hvDAO.findMaxMaHVNumber();
			String newMaHV = null;
			if (maxMaHV != null) {
			    newMaHV = "hv" + (maxMaHV + 1);
			} else {
			    // Nếu maxMaNV là null, có thể đặt một giá trị mặc định
			    newMaHV = "hv1";  
			}
			hoivien.setMaHV(newMaHV);
			HoiVien saveHoiVien=hvDAO.save(hoivien);
			return saveHoiVien;
		}else {
			hoivien.getTaiKhoanHV().setPassword(passwordEncoder.encode(hoivien.getTaiKhoanHV().getPassword()));
			TaiKhoan saveTaiKhoan =taiKhoanDAO.save(hoivien.getTaiKhoanHV());
			ChucVu chucVu=new ChucVu();
			chucVu.setId("R3");
			Authority authority=new Authority();
			authority.setChucVu(chucVu);
			authority.setTaiKhoan(saveTaiKhoan);
			Authority saveauthority = authorityDAO.save(authority);
			Integer maxMaHV=hvDAO.findMaxMaHVNumber();
			String newMaHV = null;
			if (maxMaHV != null) {
			    newMaHV = "hv" + (maxMaHV + 1);
			} else {
			    // Nếu maxMaNV là null, có thể đặt một giá trị mặc định
			    newMaHV = "hv1";  
			}
			hoivien.setMaHV(newMaHV);
			hoivien.setTienNap(0);
			HoiVien saveHoiVien=hvDAO.save(hoivien);
			return saveHoiVien;
		}

		
	}

	@Override
	@Transactional
	public void delete(String maHoiVien) {
		Optional<HoiVien> hoiVien=hvDAO.findById(maHoiVien);
		authorityDAO.deleteByTaiKhoanUserName(hoiVien.get().getTaiKhoanHV().getUserName());
		hvDAO.deleteById(maHoiVien);
		taiKhoanDAO.deleteById(hoiVien.get().getTaiKhoanHV().getUserName());
				
	}

	@Override
	@Transactional
	public HoiVien update(HoiVien hoiVien, MultipartFile file) {
		String userName=hoiVien.getTaiKhoanHV().getUserName();
		Optional<TaiKhoan> tk=taiKhoanDAO.findById(userName);
		HoiVien hv=hvDAO.findByTaiKhoanId(userName);
		String mkhauhientai=tk.get().getPassword();
		if(!mkhauhientai.equalsIgnoreCase(hoiVien.getTaiKhoanHV().getPassword())) {
			hoiVien.getTaiKhoanHV().setPassword(passwordEncoder.encode(hoiVien.getTaiKhoanHV().getPassword()));
		}
		if (file != null && !file.isEmpty()) {
			try {
				if(hoiVien.getHinhAnhHV()!=null) {
					if(hv.getHinhAnhHV().equals("")) {
						String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/NhanVien");
						hoiVien.setHinhAnhHV(linkanh_key);
					}
					else {
						String keyAnh=hoiVien.getHinhAnhHV().split(",")[1];
						CloudinaryUtils.deleteImage(keyAnh);
						String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/HoiVien");
						hoiVien.setHinhAnhHV(linkanh_key);
					}
			     }

			    else {
					String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/HoiVien");
					hoiVien.setHinhAnhHV(linkanh_key);
				}

			} catch (Exception e) {
				e.printStackTrace();
			}
			TaiKhoan saveTaiKhoan = taiKhoanDAO.save(hoiVien.getTaiKhoanHV());
			authorityDAO.deleteByTaiKhoanUserName(hoiVien.getTaiKhoanHV().getUserName());
			ChucVu chucVu=new ChucVu();
			chucVu.setId("R3");
			Authority authority=new Authority();
			authority.setChucVu(chucVu);
			authority.setTaiKhoan(saveTaiKhoan);
			Authority saveauthority = authorityDAO.save(authority);
			hoiVien.setTienNap(hv.getTienNap());
			HoiVien saveHoiVien = hvDAO.save(hoiVien);

			return saveHoiVien;
		} else {
			TaiKhoan saveTaiKhoan = taiKhoanDAO.save(hoiVien.getTaiKhoanHV());
			authorityDAO.deleteByTaiKhoanUserName(hoiVien.getTaiKhoanHV().getUserName());
			ChucVu chucVu=new ChucVu();
			chucVu.setId("R3");
			Authority authority=new Authority();
			authority.setChucVu(chucVu);
			authority.setTaiKhoan(saveTaiKhoan);
			Authority saveauthority = authorityDAO.save(authority);
			hoiVien.setTienNap(hv.getTienNap());
			HoiVien saveHoiVien = hvDAO.save(hoiVien);

			return saveHoiVien;
		
	}
	}

	@Override
	public Page<HoiVien> searchHoiViens(String keyword, Pageable pageable) {
		return hvDAO.searchHoiViens(keyword, pageable);
	}

}
